import { Application } from '../declarations';
import project from './project/project.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(project);
}
