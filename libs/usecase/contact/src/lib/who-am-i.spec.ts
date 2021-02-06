import { ContactRepository } from './ports/contact.repository';
import { WhoAmI } from './who-am-i';

class Repository extends ContactRepository {

}

describe('WhoAmI', () => {
  it('should create an instance', () => {
    expect(new WhoAmI(new Repository())).toBeTruthy();
  });
});
