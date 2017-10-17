module Relatable
  extend ActiveSupport::Concern

  def related(insight)
    tags = insight.tags
    matches = []
    score = []

    entities.each do |klass|
      records = klass.joins(:tags).where(tags: {id: tags.pluck(:id)})
      matches << { klass: klass, records: records.each_with_object(Hash.new(0)) { |record, hash| hash[record.id] += 1 } }
    end

    matches.each do |match|
        match[:records].each { |k, v| score << { id: k, quantity: v, klass: match[:klass] } } if match[:records].present?
    end

    score.sort! { |a, b| b[:quantity] <=> a[:quantity] }
    related = score.map { |e| e[:klass].find(e[:id]) } - [insight]
  end
end