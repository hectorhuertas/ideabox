module TagLoader
  def self.for(params)
    params[:tags] ||= []
    params[:tags] = params[:tags].map{|tag| Tag.find_or_create_by(name: tag)}
    params
  end
end
