module ApplicationHelper
  def title(page_title)
    provide :title, page_title.to_s
  end

  def readable_file_size(size)
    number_to_human_size(size)
  end
end
