class YarnReply
  include Dynamoid::Document

  belongs_to :yarn, touch: true
  has_one :yarn_content
  has_many :yarn_likes

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :yarn_replies, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :account_id, :string
  field :yarn_id, :string
  field :likes, :string
  field :played, :string
  field :location, :string
  field :ip_address, :string
  field :user_agent, :string

  global_secondary_index hash_key: :yarn_id, projected_attributes: :all
  global_secondary_index hash_key: :account_id, projected_attributes: :all
end
