// Edit this to allow commands
const ALLOWED_SCRIPTS=["install:ui", "install:api"];

const NODE_MODULES="node_modules";
const STATE_FILE=".yarn-state.yml";

module.exports = {
  name: `plugin-override-state`,
  factory: require => ({
    hooks: {
      async setupScriptEnvironment(project, scriptEnv) {
        if (scriptEnv != null && ALLOWED_SCRIPTS.find(script => script == scriptEnv.npm_lifecycle_event) != null) {
          if (project.configuration.get(`nodeLinker`) === `node-modules`) {
            const stateFile = [project.cwd, NODE_MODULES, STATE_FILE].join("/");
            const fs = require("fs");
            
            if (!fs.existsSync(stateFile)) {
              console.log("Detected command allowed in stateless environment and state file is missing.");
              console.log("Generating empty state file...");

              fs.mkdirSync(require('path').dirname(stateFile), { recursive: true });
              fs.appendFileSync(stateFile, "# Autogenerated\n", {"flag":"w+"});
              fs.appendFileSync(stateFile, "__metadata:\n");
              fs.appendFileSync(stateFile, "  version: 1\n");
              fs.appendFileSync(stateFile, "  nmMode: classic\n");
            }
          }
        }
      }
    },
  })
};