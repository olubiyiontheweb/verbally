# user record

class User
  include Dynamoid::Document

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :creators, hash_key: :user_id, range_key: :id, read_capacity: 5, write_capacity: 5
  field :id, :integer
  field :user_id, :number
  field :first_name, :string
  field :last_name, :string
  field :email, :string
  field :username, :string
  field :encrypted_password, :string
  field :reset_password_token, :string
  field :reset_password_sent_at, :datetime
  field :remember_created_at, :datetime
  field :sign_in_count, :number
  field :current_sign_in_at, :number
  field :last_sign_in_at, :number
  field :current_sign_in_ip, :number
  field :last_sign_in_ip, :number

  global_secondary_index hash_key: :email, projected_attributes: :all
  global_secondary_index hash_key: :reset_password_token, projected_attributes: :all

  # to supports password hashing, user signup, password resets, email confirmations and login counts
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable
  # :lockable, :confirmable, :validatable, :omniauthable, omniauth_providers: %i[facebook]

  # remember to fix uniqueness
  validates_presence_of :username
  # validates_uniqueness_of :username, message: 'Sorry, this username has already been used!'
  # validates_uniqueness_of :email, message: 'Sorry, this email is already registered!'
  validates_confirmation_of :password
  validates_format_of :email, with: /@/
end
