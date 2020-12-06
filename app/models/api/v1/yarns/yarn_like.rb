class YarnLike
  include Dynamoid::Document

  belongs_to :yarn, touch: true
  belongs_to :yarn_replies, touch: true

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :yarn_likes, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :yarn_id, :string
  field :liked_by, :string
  field :yarn_reply, :string

  global_secondary_index hash_key: :yarn_id, projected_attributes: :all
  global_secondary_index hash_key: :liked_by, projected_attributes: :all
end
