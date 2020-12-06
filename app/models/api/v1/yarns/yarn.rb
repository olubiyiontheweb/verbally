# user record

class Yarn
  include Dynamoid::Document
  include ActiveModel::Validations
  include ActiveModel::Serializers::JSON

  has_one :yarn_content
  has_many :yarn_replies
  has_many :yarn_likes
  belongs_to :account, class_name: 'Account', foreign_key: 'account_id'

  attr_accessor :yarn_content

  # scope :visible, -> { where(visible: true) }
  # scope :invisible, -> { where(visible: false) }
  # scope :sorted, -> { order('yarns.position ASC') }
  # scope :newest_first, -> { order('yarns.created_at DESC') }
  # scope :search, lambda { |query|
  #   where(['name LIKE ?', "%#{query}%"])
  # }

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :yarns, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :account_id, :string
  field :privacy_status, :string, default: 'public'
  field :likes, :string
  field :shares, :string
  field :no_of_replies, :string
  field :visible, :boolean, store_as_native_boolean: false, default: 'true'
  field :deleted_at, :datetime
  field :location, :string
  field :ip_address, :string
  field :user_agent, :string

  global_secondary_index hash_key: :account_id, projected_attributes: :all
  # global_secondary_index hash_key: :visible, projected_attributes: :all

  validates_presence_of :account_id

  private

  def soft_delete
    update_attributes(visible: False, deleted_at: Time.current)
  end
end
