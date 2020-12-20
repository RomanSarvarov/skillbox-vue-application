export default function navigate(page, params) {
  this.emitter.emit('navigate', { page, params });
}
