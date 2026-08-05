/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class RecordVideo {
    constructor(videoObj) {
        this.video = videoObj;
        this.mediaRecorder = null;
        this.stream = null;
        this.chunks = [];
        this.objectUrl = null;
        this.destroyed = false;
        this.handleLoadedMetadata = () => {
            const playResult = this.video.play();
            if (playResult && typeof playResult.catch === 'function') {
                playResult.catch(() => undefined);
            }
        };
        this.handleDataAvailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.chunks.push(event.data);
            }
        };
    }
    init() {
        if (!this.isSupport()) {
            return Promise.reject(new Error('MediaDevices.getUserMedia is not supported'));
        }
        this.destroyed = false;
        return navigator.mediaDevices
            .getUserMedia({
            audio: true,
            video: true,
        })
            .then((stream) => {
            if (this.destroyed) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }
            this.stream = stream;
            if ('srcObject' in this.video) {
                this.video.srcObject = stream;
            }
            else {
                this.objectUrl = window.URL.createObjectURL(stream);
                this.video.src = this.objectUrl;
            }
            this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.addEventListener('dataavailable', this.handleDataAvailable);
        })
            .catch((error) => {
            this.destroy();
            throw error;
        });
    }
    startRecord() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            this.chunks = [];
            this.mediaRecorder.start();
        }
    }
    stopRecord() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }
    }
    isSupport() {
        const flag = typeof navigator !== 'undefined' &&
            navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia;
        if (flag) {
            return true;
        }
        return false;
    }
    destroy() {
        this.destroyed = true;
        this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        if (this.mediaRecorder) {
            this.mediaRecorder.removeEventListener('dataavailable', this.handleDataAvailable);
            if (this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
            }
        }
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
        }
        this.video.pause();
        if ('srcObject' in this.video) {
            this.video.srcObject = null;
        }
        if (this.objectUrl) {
            window.URL.revokeObjectURL(this.objectUrl);
            this.video.removeAttribute('src');
        }
        this.mediaRecorder = null;
        this.stream = null;
        this.objectUrl = null;
        this.chunks = [];
    }
}

exports.default = RecordVideo;
