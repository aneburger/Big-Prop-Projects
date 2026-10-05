import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list().title('Website content').items([
    S.documentTypeListItem('project')
      .title('Projects')
      .child(S.documentTypeList('project').title('Projects').defaultOrdering([
        {field: 'date', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ])),
    ...S.documentTypeListItems().filter(item => item.getId() !== 'project'),
  ])
