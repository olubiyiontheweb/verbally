# user record

class User
  include Dynamoid::Document
  include ActiveModel::Validations

  has_many :authentication_tokens

  # specifying table name for this model, it'll be created if it does not exist yet
  table name: :creators, key: :id, read_capacity: 5, write_capacity: 5
  field :id, :string
  field :first_name, :string
  field :last_name, :string
  field :email, :string
  field :username, :string
  field :admin, :boolean, store_as_native_boolean: false, default: 'false'
  field :encrypted_password, :string
  field :password_salt, :string
  field :accept_terms_condition, :boolean, store_as_native_boolean: false
  field :date_of_birth, :date, store_as_string: true
  field :unconfirmed_email, :string
  field :confirmed_at, :datetime
  field :deleted_at, :datetime
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
         :rememberable, :trackable, :encryptable, encryptor: :restful_authentication_sha1
  #   :lockable, :validatable, :omniauthable, omniauth_providers: %i[facebook]

  validates_presence_of :username
  validates_confirmation_of :password
  validates_format_of :email, with: /@/

  # ensure user account is active
  def active_for_authentication?
    super && !deleted_at
  end

  private

  # instead of deleting, indicate the user requested a delete & timestamp it
  def soft_delete
    update_attribute(:deleted_at, Time.current)
  end

  # provide a custom message for a deleted account
  def inactive_message
    !deleted_at ? super : :deleted_account
  end

  # control confirmation of emails between environments
  def confirmation_required?
    ENV.fetch('confirmation_required')
  end
end
