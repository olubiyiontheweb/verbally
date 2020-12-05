class YarnLike
  include Dynamoid::Document

  belongs_to :yarn
  has_many :yarn_replies
  has_many :yarn_likes

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :yarn_contents, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :yarn_id, :string
  field :yarn_status, :string
  field :text, :string
  field :has_voice_over, :boolean, store_as_native_boolean: false, default: 'false'
  field :has_video, :boolean, store_as_native_boolean: false, default: 'false'
  field :text, :string
  field :played, :string

  global_secondary_index hash_key: :yarn_id, projected_attributes: :all
end
