class LibraryType < EnumerateIt::Base
  associate_values(
    publication: [1, 'Publication'],
    journal: [2, 'Journal']
  )
end
