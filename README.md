# Project Template: React/Rails API

## Description

Planet Hopper is a simple Ruby on Rails and ReactJS web application that duplicates many of the features of the popular website Airbnb. The slight distinction is users have the ability to book listings on other planets! 

The frontend javascript is built primarily with ReactJS. I am using Redux for all of the complex state management. For styling, I am using a combination of Material UI, React Bootstrap, CSS, and Styled Components based on the needs for a specific feature. I am using Google Maps APIs for Maps and an Autocomplete search bar.

On the backend I am using Ruby on Rails as my API and mailer. The database that I am using is Postgresql.

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Render account
- Postgresql

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Setup

Start by **cloning** (not forking) the project template repository and removing
the remote:

```console
$ git clone https://github.com/yourusername/Planet-Hopper.git
$ cd Planet-Hopper
$ git remote rm origin
```

When you're ready to start building your project, run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

Make sure to also update this README to include documentation about
your project. Here's a list of some [awesome readmes][] for inspiration.

[awesome readmes]: https://github.com/matiassingers/awesome-readme

### Google API Keys

My app requires two particular API keys in order to utilize the search autocomplete and maps components. These components both pull from the Google Maps API but they are not a necessity to my application. The react code is already set up and all that is required from you is the API key.

### Step 1: Go to the Google Cloud Console

Visit [Google Cloud Console](https://console.cloud.google.com) and sign in with your Google account.

### Step 2: Create a New Project

From the project drop-down, select 'New Project', give it a name, and click 'Create'.

### Step 3: Enable the APIs

For **Google Maps**, navigate to **'APIs & Services' -> 'Library'**, and search for **'Maps JavaScript API', 'Geocoding API',** and **'Places API'**. Enable them for your project.

For **Google Places**, navigate to **'APIs & Services' -> 'Library'**, and search for **'Places API'**. Enable it for your project.

### Step 4: Get the API key

Navigate to **'APIs & Services' -> 'Credentials'**, and click on **'Create Credentials' -> 'API key'**. Your new API key will appear in a pop-up window.

## Setup Google APIs in your React Application

### Step 1: Create .env File

In the client directory, where the package-json files are, create a new file named **`.env`**. In this file, add your environment variable in the following format: REACT_APP_GOOGLE_API_KEY=your_api_key_here

Remember to replace `your_api_key_here` with your actual API key.

Please remember to add the .env file you just created to the .gitignore file so that no one will have access to your API key if you push your changes to github.

### Step 2: Restart your Development Server

Restart your development server by typing in Control & C simultaneously on your keyboard on the terminal running the server. Then run npm start --prefix client if you are currently not in the client directory. If you are in the client directory, type in npm start.

## Setting up the Mailer Service

### Using ZohoMail

For this particular project, I used ZohoMail as the SMTP server delivering my emails initiated through my application. If you have another SMTP service that you would like to utilize, feel free to use it and hopefully the instructions I share below translate to that service as well. Also, please keep in mind that I am utilizing a free email through their website, so usage is limited.

### Sign in

Visit [Zoho Mail](https://www.zoho.com/mail/) and create an account.

### Connect your Account to the App

Find the config directory within app and create a file called "local_env.yml". Add this particular file to the .gitignore file.

## Setting up a `local_env.yml` file in Rails

Rails allows for the loading of environment-specific variables during application initialization. You can use a `local_env.yml` file for this purpose.

Here's how to set it up:

1. **Create a `local_env.yml` file**
  In the project files, delete the `config/credentials.yml.enc` file. Then, in the
  terminal, run the following:

  ```sh
  $ EDITOR="code --wait" bin/rails credentials:edit
  ```

  **Note**: if you use a different text editor than VS Code, you will need to replace
  `code` with the appropriate command.

  The command above will open a file in VS Code and wait for you to close it
  before completing the process of creating the credential files. Once you've done
  that, you should see both the `credentials.yml.enc` and `master.key` files in
  the `config` folder. You will need the value in the `master.key` file to set up
  the web service in Render.

  Commit your changes and push them to GitHub.

2. **Add your Variables**
    Open `local_env.yml` file and add your credentials:
    ```yaml
    MAIL_USERNAME: 'johndoe@zohomail.com'
    MAIL_PASSWORD: 'password123'
    ```

3. **Update `.gitignore`**
    Make sure to add `config/local_env.yml` to your `.gitignore` file. This step is crucial, as it prevents sensitive data from being exposed in your version control system.

If you look within the config directory then the environments you will see that each look like the following:

```ruby
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    :address              => 'smtp.zoho.com',
    :port                 => 465,
    :user_name            => ENV['MAIL_USERNAME'],
    :password             => ENV['MAIL_PASSWORD'],
    :authentication       => 'plain',
    :ssl                  => true,
    :enable_starttls_auto => true  
  }
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
```
The ENV variables are automatically initialized when the application is first initialized.

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

We recommend version 2.7.4. If you need to upgrade you can install it using rvm:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

### Install Postgresql

PostgreSQL (or just Postgres for short) is an advanced database management
system with more features than SQLite. If you don't already have it installed,
you'll need to set it up.

#### PostgreSQL Installation for WSL

To install Postgres for WSL, run the following commands from your Ubuntu terminal:

```sh
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev
```

Then confirm that Postgres was installed successfully:

```sh
psql --version
```

Run this command to start the Postgres service:

```sh
sudo service postgresql start
```

Finally, you'll also need to create a database user so that you are able to
connect to the database from Rails. First, check what your operating system
username is:

```sh
whoami
```

If your username is "ian", for example, you'd need to create a Postgres user
with that same name. To do so, run this command to open the Postgres CLI:

```sh
sudo -u postgres -i
```

From the Postgres CLI, run this command (replacing "ian" with your username):

```sh
createuser -sr ian
```

Then enter `control + d` or type `logout` to exit.

[This guide][postgresql wsl] has more info on setting up Postgres on WSL if you
get stuck.

[postgresql wsl]: https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql

#### Postgresql Installation for OSX

To install Postgres for OSX, you can use Homebrew:

```sh
brew install postgresql
```

Once Postgres has been installed, run this command to start the Postgres
service:

```sh
brew services start postgresql
```

## Troubleshooting

If you ran into any errors along the way, here are some things you can try to
troubleshoot:

- If you're on a Mac and got a server connection error when you tried to run
  `rails db:create`, one option for solving this problem for Mac users is to
  install the Postgres app. To do this, first uninstall `postgresql` by running
  `brew remove postgresql`. Next, download the app from the
  [Postgres downloads page][] and install it. Launch the app and click
  "Initialize" to create a new server. You should now be able to run
  `rails db:create`.

- If you're using WSL and got the following error running `rails db:create`:

  ```txt
  PG::ConnectionBad: FATAL:  role "yourusername" does not exist
  ```

  The issue is that you did not create a role in Postgres for the default user
  account. Check [this video](https://www.youtube.com/watch?v=bQC5izDzOgE) for
  one possible fix.

- If your app failed to deploy at the build stage, make sure your local
  environment is set up correctly by following the steps at the beginning of
  this lesson. Check that you have the latest versions of Ruby and Bundler, and
  ensure that PostgreSQL was installed successfully.

- If you deployed successfully, but you ran into issues when you visited the
  site, make sure you migrated and seeded the database. Also, make sure that
  your application works locally and try to debug any issues on your local
  machine before re-deploying. You can also check the deployment log on the
  app's page in the Render dashboard.

[postgres downloads page]: https://postgresapp.com/downloads.html

## Usage

In order to see a working form of my application as well as how to use it, I created a [YouTube Video!](https://youtu.be/663LK_NGLY4)

## Contributing and Support

For any major changes or questions, please feel free to reach out to me directly via email at jake.wehder@gmail.com.

Reach out to me on [LinkedIn!](https://www.linkedin.com/in/jake-wehder/) 

## Resources

- [styled components](https://styled-components.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Rails Guides Mailers](https://guides.rubyonrails.org/action_mailer_basics.html)
- [Zoho Mail SMTP Guide](https://www.zoho.com/mail/help/zoho-smtp.html)
- [Getting Started with Google Maps Platform](https://developers.google.com/maps/get-started)

## License 

[MIT](https://choosealicense.com/licenses/mit/)

