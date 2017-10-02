module Api
  module V1
    class ProjectMetadataController < ApplicationController
      def index
        project_metadata = ProjectMetadatum.filter(params.slice(:project_name))
        project_metadata = project_metadata.page(params[:page])

        render json: project_metadata, adapter: :json, meta: meta(project_metadata)
      end
    end
  end
end
