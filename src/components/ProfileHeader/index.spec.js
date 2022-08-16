import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileHeader from './index';
import { PARSED_USER_1 } from '../../utils/dummyData';
import { expectValuesBeShown } from '../../utils/tests';

describe('Profile header', () => {
  test('renders correctly', () => {
    const user = PARSED_USER_1;
    // render without err
    render(<ProfileHeader {...PARSED_USER_1} />);

    // expect data be displayed
    expectValuesBeShown(Object.values(user), [user.githubUrl, user.avatarUrl]);
  });

  test("when nonrequired data are not provided, don't err", () => {
    // data for testing
    const { name, githubUrl, username } = PARSED_USER_1;

    render(<ProfileHeader name={name} githubUrl={githubUrl} username={username} />);
  });
});
