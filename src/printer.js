const chalk = require('chalk');

function highlightMatch(str, match) {
  return str.split(match).join(chalk.magenta(match));
}

function printSingleVersion(moduleObject) {
  const getParents = () => {
    const parentsList = [];
    let currentParent = moduleObject.parent;

    while (currentParent) {
      parentsList.push(currentParent);
      currentParent = currentParent.parent;
    }

    return parentsList.map(p => chalk.magenta(`(${p.name})`)).join(' ');
  };

  return `> ${chalk.bold(moduleObject.version)} ${getParents()}`.trim();
}

module.exports.printVersions = (modules) => {
  return modules.map(m => printSingleVersion(m.toObject())).join('\n');
};

module.exports.printModulesList = (modulesList, { match } = {}) => {
  return modulesList.map(([name, nodeModule]) => `${highlightMatch(name, match)} ${exports.printVersions(nodeModule)}`).join('\n');
};

module.exports.notFoundModuleMessage = name => chalk.red(`Could not find any module by the name "${name}"`);

module.exports.notMatchModuleMessage = str => chalk.red(`Could not find any module that matches "${str}"`);

module.exports.noModulesMessage = () => chalk.red('Could not find any module in the node_modules directory');
