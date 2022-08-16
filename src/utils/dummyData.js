/** dummy data for tests */

// a user data. Data props have been parsed to match props in Redux store for `user`
export const PARSED_USER_1 = {
  username: 'octocat',
  avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
  githubUrl: 'https://github.com/octocat',
  name: 'The Octocat',
  location: 'San Francisco',
  bio: 'Hello world!',
  publicRepos: 8,
  followers: 6561,
};

// a GitHub user info as received from GitHub API. Has been truncated a bit for readability and practical usage on
// this app
export const RAW_USER_1 = {
  login: 'octocat',
  id: 583231,
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  html_url: 'https://github.com/octocat',
  name: 'The Octocat',
  location: 'San Francisco',
  bio: 'Hello world!',
  public_repos: 8,
  followers: 6561,
};

// list of GitHub repos. Data props have been parsed to match props in Redux store for `starredRepos`
export const PARSED_REPOS_1 = [
  {
    id: 1296269,
    fullName: 'octocat/Hello-World',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    ownerName: 'octocat',
    url: 'https://github.com/octocat/Hello-World',
  },
  {
    id: 1300192,
    fullName: 'octocat/Spoon-Knife',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    ownerName: 'octocat',
    url: 'https://github.com/octocat/Spoon-Knife',
  },
  {
    id: 64413545,
    fullName: 'violet-org/boysenberry-repo',
    ownerName: 'violet-org',
    ownerAvatarUrl: 'https://avatars.githubusercontent.com/u/20708333?v=4',
    url: 'https://github.com/violet-org/boysenberry-repo',
  },
];

// list of GitHub repos as received from GitHub API. Has been truncated a bit for readability and practical usage on
// this app
export const RAW_REPOS_1 = [
  {
    id: 64413545,
    full_name: 'violet-org/boysenberry-repo',
    owner: {
      login: 'violet-org',
      id: 20708333,
      avatar_url: 'https://avatars.githubusercontent.com/u/20708333?v=4',
    },
    html_url: 'https://github.com/violet-org/boysenberry-repo',
  },
  {
    id: 1300192,
    full_name: 'octocat/Spoon-Knife',
    owner: {
      login: 'octocat',
      id: 583231,
      avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    },
    html_url: 'https://github.com/octocat/Spoon-Knife',
  },
  {
    id: 1296269,
    full_name: 'octocat/Hello-World',
    owner: {
      login: 'octocat',
      id: 583231,
      avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    },
    html_url: 'https://github.com/octocat/Hello-World',
  },
];
