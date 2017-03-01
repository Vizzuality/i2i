module ApplicationHelper

  def title(page_title)
    provide :title, page_title.to_s
  end
end
