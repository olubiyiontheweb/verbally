# user record

class User
  include Dynamoid::Document
  include ActiveModel::Validations

  # has_one :uniquevalue

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :creators, key: :id, read_capacity: 5, write_capacity: 5
  field :id
  field :first_name, :string
  field :last_name, :string
  field :email, :string
  field :username, :string
  field :encrypted_password, :string
  field :password_salt, :string
  field :accept_terms_condition, :boolean, store_as_native_boolean: false
  field :date_of_birth, :date, store_as_string: true
  field :unconfirmed_email, :string
  field :confirmed_at, :datetime
  field :confirmation_token, :string
  field :confirmation_sent_at, :datetime
  field :reset_password_token, :string
  field :reset_password_sent_at, :datetime
  field :remember_created_at, :datetime
  field :sign_in_count, :number
  field :current_sign_in_at, :number
  field :last_sign_in_at, :number
  field :current_sign_in_ip, :number
  field :last_sign_in_ip, :number

  global_secondary_index hash_key: :email, projected_attributes: :all
  global_secondary_index hash_key: :username, projected_attributes: :all
  global_secondary_index hash_key: :confirmation_token, projected_attributes: :all
  global_secondary_index hash_key: :reset_password_token, projected_attributes: :all

  # to supports password hashing, user signup, password resets, email confirmations and login counts
  devise :database_authenticatable, :registerable, :recoverable, :confirmable,
         :trackable, :encryptable, encryptor: :restful_authentication_sha1
  #  :rememberable, :lockable, :validatable, :omniauthable, omniauth_providers: %i[facebook]

  validates_presence_of :username
  validates_confirmation_of :password
  validates_format_of :email, with: /@/

  # def check_if_record_exists
  #   User.username.errors.add('Username exists') if @username == true
  # end

  protected

  def confirmation_required?
    ENV.fetch('confirmation_required')
  end
end
