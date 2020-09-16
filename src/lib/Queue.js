import Bee from 'bee-queue';
import CancelattionMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancelattionMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        fila: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].fila.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { fila, handle } = this.queues[job.key];

      fila.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.nome}: FAILED`, err);
  }
}

export default new Queue();
