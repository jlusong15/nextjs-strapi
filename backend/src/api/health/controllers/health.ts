export default {
  async check(ctx) {
    ctx.send({
      status: 'ok',
      timestamp: Date.now(),
      uptime: process.uptime(),
    });
  },
};