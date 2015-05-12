# template-based-authoring-frontend

Project for the front-end of the Template Based Authoring System

## Build

Project uses bower for package installation, and is built using grunt. All src files are concatanated and minified into the bin directory as part of this process.

### Local Build Environment

The build environment requires node, npm, grunt, bower and karma to be installed on your local machine 

Node can be downloaded and installed from https://nodejs.org/

Note that an out of date node installation might result in build errors reporting: `Symbol not found: _node_module_register` so you'll need to grab a new copy from the website in that case.  No package manager, no self check for updates.

```bash
sudo npm -g install grunt-cli karma bower
npm install
bower install 
bower install karma
```

Or bower may just need updating:

```bash
sudo npm install -g bower
```

For local testing use nginx to proxy requests to the snowowl api endpoints. 

```bash
server {
		listen		80;
		server_name	localhost;
 
		location / {
			root /Users/{your_account_here}/template-based-authoring-frontend/front-end/bin;

		}
 
		location /snowowl {
			proxy_pass https://dev-term.ihtsdotools.org/snowowl;
			proxy_set_header Authorization "Basic {authorisation_token_here}";
		}

	}
```