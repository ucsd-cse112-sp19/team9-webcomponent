const axios = require('axios')

/**
 * Jira client library
 *
 * @example
 * const jira = new Jira({
 *   host: 'yourhost',
 *   user: 'jhn@doe.com',
 *   token: 'secret',
 * })
 *
 * const projects = await jira.projects()
 *
 * @see  https://developer.atlassian.com/cloud/jira/platform/rest/v3
 * @todo  implement all methods
 */
class Jira {

  /**
   * @param  {Object} options
   * @param  {String} options.host    host of your jira instance
   * @param  {String} options.user    your username
   * @param  {String} options.token   secret token
   * @param  {Number} options.version api version
   */
  constructor({ host, user, token, version = 3 }) {
    this.version = version
    this.baseClient = new axios.create({
      baseURL: `https://${host}.atlassian.net/rest/api/${this.version}`,
      auth: {
        username: user,
        password: token,
      },
    })
  }

  /**
   * @typedef {JiraProjects} JiraProjects
   *
   * @property {String} assigneeType  indicates if project is assigned
   * @property {Object} avatarUrls    project avatars of sizes
   * @property {Object[]} components  list of all components defined in the project
   * @property {String} description   short description of a project
   * @property {String} expand        expanded description
   * @property {String} id            project id
   * @property {Object[]} issueTypes  issue types defined in the project
   * @property {String} key           project key
   * @property {Object} lead          lead person
   * @property {String} name          project name
   * @property {String} projectTypeKey project type
   * @property {Object} roles         list of all roles with the project
   * @property {String} self          url to project details
   * @property {Boolean} simplified   if project is simplified
   * @property {Object[]} versions    list of all versions project has
   */

  /**
   * List of all projects for given category
   * @param  {Object} options
   * @param  {Number} [options.categoryId=1000] category id
   * @return {JiraProjects[]}                   projects returned by the API
   */
  async projects({ categoryId = 1000 }) {
    const maxResults = 200
    const response = await this.baseClient.get('project/search', {
      params: { categoryId, maxResults },
    })
    return response.data.values
  }

  async project({ projectKey }) {
    const response = await this.baseClient.get(`project/${projectKey}`, {
      expand: 'issueTypes,lead,description',
    })
    return response.data
  }

  async search({ jql, fields = ['summary', 'status', 'assignee', 'timetracking'] }) {
    const response = await this.baseClient.post('search', {
      jql,
      maxResults: 100,
      fields,
    })
    return response.data.issues
  }

  async projectRoles({ projectKey, role }) {
    const response = await this.baseClient.get(`project/${projectKey}/role/${role}`)
    return response.data.actors
  }

  async usersByGroup({ groupname }) {
    const response = await this.baseClient.get('group/member', {
      params: { groupname, maxResults: 200, includeInactiveUsers: true },
    })
    return response.data.values
  }

  async categories() {
    await this.baseClient.get('projectCategory')
  }
}

module.exports = Jira