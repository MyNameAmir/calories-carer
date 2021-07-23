// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
// used to build the query string passed to the reCAPTCHA service
import querystring from 'querystring';

// used to connect with the reCAPTCHA service
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
        // extract the incoming request data
    const { data } = context;

    // FYI
    console.log( data );

    // verify the incoming token against the reCAPTCHA service
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      querystring.stringify({
        secret: process.env.RECAPTCHA_SECRET,
        response: data.token
      })
    );

    // FYI
    console.log(response.data.score);

    // if the response fails or the score is too low, throw an error
    if ( !response.data.success || response.data.score < 0.5 ) {
      console.log(response.data.score );
      throw new Error('reCAPTCHA fail');
    }

    // if everything is OK, carry on
    return context;
  };
};
