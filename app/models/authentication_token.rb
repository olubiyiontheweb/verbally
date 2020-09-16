class AuthenticationToken
  include Dynamoid::Document

  belongs_to :user

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :token_devices, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :user_id, :string
  field :token, :string, null: false
  field :last_used_at, :datetime
  field :expires_in, :integer
  field :ip_address, :string
  field :user_agent, :string

  global_secondary_index hash_key: :token, projected_attributes: :all
  global_secondary_index hash_key: :user_id, projected_attributes: :all
end
