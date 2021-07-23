import app from '../../src/app';

describe('\'project\' service', () => {
  it('registered the service', () => {
    const service = app.service('project');
    expect(service).toBeTruthy();
  });
});
