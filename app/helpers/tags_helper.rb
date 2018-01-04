module TagsHelper
    def self.slugsToNames(slugs)
        Tag.where(slug: slugs)
    end
end
  