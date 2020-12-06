class YarnContent
  include Dynamoid::Document
  include ActiveModel::Serializers::JSON

  belongs_to :yarn, touch: true

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :yarn_contents, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :yarn_id, :string
  field :yarn_text, :raw
  field :played, :string
  field :has_voice_over, :boolean, store_as_native_boolean: false, default: 'false'
  field :has_video, :boolean, store_as_native_boolean: false, default: 'false'

  global_secondary_index hash_key: :yarn_id, projected_attributes: :all

  validates_presence_of :yarn_id
end
