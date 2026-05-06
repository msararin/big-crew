const { productStrategist } = require("../crew/productStrategist");
const { systemArchitect } = require("../crew/systemArchitect");
const { qaSentinel } = require("../crew/qaSentinel");
const { promptSmith } = require("../crew/promptSmith");
const { releaseCaptain } = require("../crew/releaseCaptain");
const { renderWorkPackage } = require("../templates/workPackageTemplate");

function buildEngineeringWorkPackage(taskDescription) {
  const brief = String(taskDescription || "").trim();

  const product = productStrategist(brief);
  const architecture = systemArchitect(brief, product);
  const qa = qaSentinel(brief, product, architecture);
  const prompt = promptSmith(brief, product, architecture);
  const release = releaseCaptain(brief, product, architecture, qa);

  return renderWorkPackage({
    taskDescription: brief,
    product,
    architecture,
    qa,
    prompt,
    release,
  });
}

module.exports = {
  buildEngineeringWorkPackage,
};
