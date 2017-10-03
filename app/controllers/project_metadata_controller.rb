class ProjectMetadataController < ApiController
  before_action :require_login

  def index
    project_metadata = ProjectMetadatum.filter(params.slice(:project_name))
    project_metadata = project_metadata.page(params[:page]).per(params[:per_page])

    render json: project_metadata, adapter: :json, meta: meta(project_metadata)
  end
end
