//use idb to wrap asynchronous db requests in promises to support sequential operations
import { openDB } from 'idb';
import { MilestoneDB } from '../models/milestone-db';
import { Phases } from '../data/phases';
import { Tasks } from '../data/tasks';
import { Steps } from '../data/steps';

//update the db version each time it changes (integer only)
const dbVersion = 2; 

//open appDB database
export const dbPromise = async () => openDB<MilestoneDB>('appDB', dbVersion, {
  async upgrade(appDB) {
    console.log(`${appDB.name} upgrade required. Upgrading to version ${appDB.version}...`);
    const objectStoreNames = Array.from(appDB.objectStoreNames);

    if (objectStoreNames.every(x => x !== 'deployments')) {
      appDB.createObjectStore('deployments', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('dateModified', 'dateModified', {unique: false})
    }

    if(objectStoreNames.every(x => x !== 'deployment-items')) {
      const deploymentStore = 
      appDB.createObjectStore('deployment-items', {
        keyPath: 'id',
        autoIncrement: true
      }); 
      deploymentStore.createIndex('stepId', 'stepId', {unique: false});
      deploymentStore.createIndex('deploymentId', 'deploymentId', {unique: false});
    }

    if (objectStoreNames.every(x => x !== 'phases')) {
      appDB.createObjectStore('phases', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('title', 'title', {unique: true});
    }

    if (objectStoreNames.every(x => x !== 'tasks')) {
      appDB.createObjectStore('tasks', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('phaseId', 'phaseId', {unique: false});
    }

    if (objectStoreNames.every(x => x !== 'steps')) {
      appDB.createObjectStore('steps', {
        keyPath: 'id',
        autoIncrement: true
      }).createIndex('taskId', 'taskId', {unique: false});
    }
  }
}).then(async appDB => {

  const phases = appDB.transaction('phases', 'readwrite');
  await Promise.all(Phases.map(async phase => await phases.store.put(phase)));
  await phases.done;

  const tasks = appDB.transaction('tasks', 'readwrite');
  await Promise.all(Tasks.map(async task => await tasks.store.put(task)));
  await tasks.done;

  const steps = appDB.transaction('steps', 'readwrite');
  await Promise.all(Steps.map(async step => await steps.store.put(step)));
  await steps.done;

  return appDB;
}).then(async appDB => {
  return appDB;
});
