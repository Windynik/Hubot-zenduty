// #   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

zenDutyApiKey = process.env.HUBOT_ZENDUTY_API_KEY;

if (zenDutyApiKey == null) {
  console.log(
    "Missing HUBOT_ZENDUTY_API_KEY in environment: please set and try again"
  );
  process.exit(1);
}
zenduty = require("zenduty-sdk");

module.exports = function(robot) {
  robot.respond(/is it (weekend|holiday)\s?\?/i, function(msg) {
    var today = new Date();

    msg.send(today.getDay() === 0 || today.getDay() === 6 ? "YES" : "NO");
  });

  // robot.hear(/badger/i, function(res) {
  //   res.send("Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS");
  // });

  robot.respond(/get (.*)/i, function(res) {
    incidentNumber = res.match[1];
    res.send(
      `Getting you information on incident number #${incidentNumber}, gimme a second...`
    );
    api_obj = new zenduty.IncidentsApi(new zenduty.ApiClient(zenDutyApiKey));

    api_obj
      .getIncidentByNumber(incidentNumber)
      .then(function(response) {
        var status =
          response.status == 1
            ? "Triggered"
            : response.status == 2
            ? "Acknowledged"
            : "Resolved";
        res.send(`Ok, got it!`);
        res.send(
          `Incident Number #${incidentNumber}\nTitle : ${response.title}\nSummary : ${response.summary}\nAssigned To :  ${response.assigned_to_name}\nStatus : ${status}
        `
        );
        // res.send(JSON.stringify(response));
      })
      .catch(function(e) {
        console.log(e);
        res.send(
          "There seems to be some problem.. try again later maybe?\nDo contact my maker!"
        );
      });
  });

  robot.respond(/ack (.*)/i, function(res) {
    incidentNumber = res.match[1];
    res.send(
      `Give me a second to Acknowledge incident number #${incidentNumber} ...`
    );
    api_obj = new zenduty.IncidentsApi(new zenduty.ApiClient(zenDutyApiKey));
    payload = {
      status: 2,
      incident_number: incidentNumber
    };
    api_obj
      .acknowledgeOrResolveIncident(incidentNumber, payload)
      .then(function(response) {
        res.send(`Ok, the incident has been Acknowledged.`);
      })
      .catch(function(e) {
        console.log(e);
        res.send("There seems to be some problem..\nDo contact my maker!");
      });
  });
  robot.respond(/res (.*)/i, function(res) {
    incidentNumber = res.match[1];
    res.send(
      `Give me a second to Resolve incident number #${incidentNumber} ...`
    );
    api_obj = new zenduty.IncidentsApi(new zenduty.ApiClient(zenDutyApiKey));
    payload = {
      status: 3,
      incident_number: incidentNumber
    };
    api_obj
      .acknowledgeOrResolveIncident(incidentNumber, payload)
      .then(function(response) {
        res.send(`Ok, the incident has been Resolved.`);
      })
      .catch(function(e) {
        console.log(e);
        res.send("There seems to be some problem..\nDo contact my maker!");
      });
  });

  robot.respond(/res (.*)/i, function(res) {
    incidentNumber = res.match[1];
    res.send(
      `Give me a second to Resolve incident number #${incidentNumber} ...`
    );
    api_obj = new zenduty.IncidentsApi(new zenduty.ApiClient(zenDutyApiKey));
    payload = {
      status: 3,
      incident_number: incidentNumber
    };
    api_obj
      .acknowledgeOrResolveIncident(incidentNumber, payload)
      .then(function(response) {
        res.send(`Ok, the incident has been Resolved.`);
      })
      .catch(function(e) {
        console.log(e);
        res.send("There seems to be some problem..\nDo contact my maker!");
      });
  });

  robot.respond(/incidents (.*)/i, function(res) {
    // if (res.match[1] == null) {
    //   res.send(
    //     `I would have retrieved the incidents for you, but you didn't mention any page numbers. \n(10 incidents per page.)`
    //   );
    //   res.send(`I don't want to flood you with walls of text, Soo`);
    //   res.send(`Just use (<My Name> incidents <Page Number>), Thank you! :)`);
    // } else {
    //   pageNumber = res.match[1];
    // }
    pageNumber = res.match[1];
    res.send(`Retriving all incidents for you..`);
    api_obj = new zenduty.IncidentsApi(new zenduty.ApiClient(zenDutyApiKey));

    payload = {
      page: pageNumber
    };
    api_obj
      .getIncidents(payload)
      .then(function(response) {
        res.send(`Ok, the incidents has been retrieved.`);
        response.results.map(incident => {
          var status =
            incident.status == 1
              ? "Triggered"
              : incident.status == 2
              ? "Acknowledged"
              : "Resolved";
          res.send(
            `Incident Number #${incident.incident_number}\nTitle : ${incident.title}\nSummary : ${incident.summary}\nAssigned To :  ${incident.assigned_to_name}\nStatus : ${status}
          `
          );
        });
      })
      .catch(function(e) {
        console.log(e);
        res.send("There seems to be some problem..\nDo contact my maker!");
      });
  });

  // robot.respond(/incidents/i, function(res) {
  // res.send(
  //   `I would have retrieved the incidents for you, but you didn't mention any page numbers. \n(10 incidents per page.)`
  // );
  // res.send(`I don't want to flood you with walls of text, Soo`);
  // res.send(`Just use (<My Name> incidents <Page Number>), Thank you! :)`);
  // });
};
