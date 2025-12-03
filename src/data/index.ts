import { homePopUp } from './text/popUps/home/home';
import { classPopUp} from './text/popUps/classManagement/class';

export const popUpByRoute: Record<string, any> = {
    '/home': homePopUp,
    '/gerenciamento-turmas': classPopUp,
    // '/gerenciamento-turmas': turmasPopUp,
};