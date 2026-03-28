import sounddevice as sd
import numpy as np
import torch
from df.enhance import enhance, init_df

class NoiseFilterEngine:
    def __init__(self, input_device=1, output_device=0, samplerate=48000, blocksize=1024):
        self.input_device = input_device
        self.output_device = output_device
        self.samplerate = samplerate
        self.blocksize = blocksize

        self.model = None
        self.df_state = None
        self.stream = None
        self._running = False

    @property
    def is_running(self):
        return self._running

    def _ensure_model_loaded(self):
        if self.model is None or self.df_state is None:
            self.model, self.df_state, _ = init_df()

    def _audio_callback(self, indata, outdata, frames, time, status):
        if status:
            print(status)

        audio = indata[:, 0].astype(np.float32, copy=False)
        audio_tensor = torch.from_numpy(audio).to(torch.float32).unsqueeze(0)
        enhanced_audio = enhance(self.model, self.df_state, audio_tensor)

        if hasattr(enhanced_audio, "detach"):
            enhanced_audio = enhanced_audio.detach().cpu().numpy()

        enhanced_audio = np.asarray(enhanced_audio, dtype=np.float32).reshape(-1)

        if enhanced_audio.shape[0] < frames:
            enhanced_audio = np.pad(enhanced_audio, (0, frames - enhanced_audio.shape[0]))
        elif enhanced_audio.shape[0] > frames:
            enhanced_audio = enhanced_audio[:frames]

        outdata[:] = enhanced_audio.reshape(-1, 1)

    def start(self):
        if self._running:
            return

        self._ensure_model_loaded()
        sd.default.device = (self.input_device, self.output_device)

        self.stream = sd.Stream(
            channels=1,
            samplerate=self.samplerate,
            blocksize=self.blocksize,
            callback=self._audio_callback,
        )
        self.stream.start()
        self._running = True

    def stop(self):
        if self.stream is not None:
            self.stream.stop()
            self.stream.close()
            self.stream = None
        self._running = False
