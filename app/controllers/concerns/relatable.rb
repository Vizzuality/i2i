module Relatable
  extend ActiveSupport::Concern

  def show
    @insight = params[:entity].capitalize.constantize.published.friendly.find(params[:slug]) rescue nil
    @tags = @insight.tags rescue nil
    @total_related = related(@insight).size;

    if params[:offset].present?
      @morePaginationAvailable = (@total_related - (params[:offset].to_i * ENV['OFFSET_SIZE'].to_i)) > 0
      @related = related(@insight).take((params[:offset].to_i * ENV['OFFSET_SIZE'].to_i))
    else
      @morePaginationAvailable = (@total_related - (1 * ENV['OFFSET_SIZE'].to_i)) > 0
      @related = related(@insight).take((1 * ENV['OFFSET_SIZE'].to_i))
    end

    @offset = params[:offset] ? params[:offset].to_i + 1 : 2;
  end

  def page_quantity
    (params[:offset].present? ? params[:offset].to_i : 1) * ENV['OFFSET_SIZE'].to_i rescue ENV['OFFSET_SIZE'].to_i
  end

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
