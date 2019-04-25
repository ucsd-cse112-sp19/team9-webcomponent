/**
 * Report Builder
 *
 * @mermaid
 * sequenceDiagram
 *   participant App
 *   participant Jira
 *   App->>Jira:project({ projectId })
 *   Jira->>App:ProjectObject
 *   App->>Jira:search()
 *   Jira->>App:IssueObject[]
 */
class ReportBuilder {
  constructor(args) {
    // code
  }

  // methods
}