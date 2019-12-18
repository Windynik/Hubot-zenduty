# hubotzen

ZenDuty integration for Hubot.


## Installation

In your hubot repository, run:

`npm install hutbotzen --save`

Then add **hutbotzen** to your `external-scripts.json`:

```json
["hutbotzen"]
```
## Configuration

| Configuration Variable        | Required | Description                       |
| ----------------------------- | -------- | --------------------------------- |
| `HUBOT_ZENDUTY_API_KEY` | **Yes** | API key for your Hubot integration.      |

## Sample Interaction

### Getting details of a single Incident

```
User> @hubot zen get 1
Hubot> @user Getting you information on incident number 1, gimme a second...
Hubot> Incident Number 1
Title : Test Incident
Summary : Test Summary
Assigned To :  Maximus
Status : Triggered
```

### Acknowledge an incident

```
User> @hubot zen ack 1
Hubot> @user Give me a second to Acknowledge incident number 1 ...
Hubot> Ok, the incident has been Acknowledged.
```

### Resolving an incident

```
User> @hubot zen res 1
Hubot> @user Give me a second to Resolve incident number 1 ...
Hubot> Ok, the incident has been Resolved.
```