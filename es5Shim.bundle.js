/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "9ab93ab97cf77bb7a5a4"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 4;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(238)(__webpack_require__.s = 238);
/******/ })
/************************************************************************/
/******/ ({

/***/ 238:
/*!*******************************************!*\
  !*** ./node_modules/es5-shim/es5-shim.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * https://github.com/es-shims/es5-shim\n * @license es5-shim Copyright 2009-2015 by contributors, MIT License\n * see https://github.com/es-shims/es5-shim/blob/master/LICENSE\n */\n\n// vim: ts=4 sts=4 sw=4 expandtab\n\n// Add semicolon to prevent IIFE from being passed as argument to concatenated code.\n;\n\n// UMD (Universal Module Definition)\n// see https://github.com/umdjs/umd/blob/master/templates/returnExports.js\n(function (root, factory) {\n    'use strict';\n\n    /* global define, exports, module */\n    if (true) {\n        // AMD. Register as an anonymous module.\n        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    } else if (typeof exports === 'object') {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like enviroments that support module.exports,\n        // like Node.\n        module.exports = factory();\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory();\n    }\n}(this, function () {\n    /**\n     * Brings an environment as close to ECMAScript 5 compliance\n     * as is possible with the facilities of erstwhile engines.\n     *\n     * Annotated ES5: http://es5.github.com/ (specific links below)\n     * ES5 Spec: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf\n     * Required reading: http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/\n     */\n\n    // Shortcut to an often accessed properties, in order to avoid multiple\n    // dereference that costs universally. This also holds a reference to known-good\n    // functions.\n    var $Array = Array;\n    var ArrayPrototype = $Array.prototype;\n    var $Object = Object;\n    var ObjectPrototype = $Object.prototype;\n    var $Function = Function;\n    var FunctionPrototype = $Function.prototype;\n    var $String = String;\n    var StringPrototype = $String.prototype;\n    var $Number = Number;\n    var NumberPrototype = $Number.prototype;\n    var array_slice = ArrayPrototype.slice;\n    var array_splice = ArrayPrototype.splice;\n    var array_push = ArrayPrototype.push;\n    var array_unshift = ArrayPrototype.unshift;\n    var array_concat = ArrayPrototype.concat;\n    var array_join = ArrayPrototype.join;\n    var call = FunctionPrototype.call;\n    var apply = FunctionPrototype.apply;\n    var max = Math.max;\n    var min = Math.min;\n\n    // Having a toString local variable name breaks in Opera so use to_string.\n    var to_string = ObjectPrototype.toString;\n\n    /* global Symbol */\n    /* eslint-disable one-var-declaration-per-line, no-redeclare, max-statements-per-line */\n    var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n    var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, constructorRegex = /^\\s*class /, isES6ClassFn = function isES6ClassFn(value) { try { var fnStr = fnToStr.call(value); var singleStripped = fnStr.replace(/\\/\\/.*\\n/g, ''); var multiStripped = singleStripped.replace(/\\/\\*[.\\s\\S]*\\*\\//g, ''); var spaceStripped = multiStripped.replace(/\\n/mg, ' ').replace(/ {2}/g, ' '); return constructorRegex.test(spaceStripped); } catch (e) { return false; /* not a function */ } }, tryFunctionObject = function tryFunctionObject(value) { try { if (isES6ClassFn(value)) { return false; } fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]', isCallable = function isCallable(value) { if (!value) { return false; } if (typeof value !== 'function' && typeof value !== 'object') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } if (isES6ClassFn(value)) { return false; } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };\n\n    var isRegex; /* inlined from https://npmjs.com/is-regex */ var regexExec = RegExp.prototype.exec, tryRegexExec = function tryRegexExec(value) { try { regexExec.call(value); return true; } catch (e) { return false; } }, regexClass = '[object RegExp]'; isRegex = function isRegex(value) { if (typeof value !== 'object') { return false; } return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass; };\n    var isString; /* inlined from https://npmjs.com/is-string */ var strValue = String.prototype.valueOf, tryStringObject = function tryStringObject(value) { try { strValue.call(value); return true; } catch (e) { return false; } }, stringClass = '[object String]'; isString = function isString(value) { if (typeof value === 'string') { return true; } if (typeof value !== 'object') { return false; } return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass; };\n    /* eslint-enable one-var-declaration-per-line, no-redeclare, max-statements-per-line */\n\n    /* inlined from http://npmjs.com/define-properties */\n    var supportsDescriptors = $Object.defineProperty && (function () {\n        try {\n            var obj = {};\n            $Object.defineProperty(obj, 'x', { enumerable: false, value: obj });\n            for (var _ in obj) { // jscs:ignore disallowUnusedVariables\n                return false;\n            }\n            return obj.x === obj;\n        } catch (e) { /* this is ES3 */\n            return false;\n        }\n    }());\n    var defineProperties = (function (has) {\n        // Define configurable, writable, and non-enumerable props\n        // if they don't exist.\n        var defineProperty;\n        if (supportsDescriptors) {\n            defineProperty = function (object, name, method, forceAssign) {\n                if (!forceAssign && (name in object)) {\n                    return;\n                }\n                $Object.defineProperty(object, name, {\n                    configurable: true,\n                    enumerable: false,\n                    writable: true,\n                    value: method\n                });\n            };\n        } else {\n            defineProperty = function (object, name, method, forceAssign) {\n                if (!forceAssign && (name in object)) {\n                    return;\n                }\n                object[name] = method;\n            };\n        }\n        return function defineProperties(object, map, forceAssign) {\n            for (var name in map) {\n                if (has.call(map, name)) {\n                    defineProperty(object, name, map[name], forceAssign);\n                }\n            }\n        };\n    }(ObjectPrototype.hasOwnProperty));\n\n    //\n    // Util\n    // ======\n    //\n\n    /* replaceable with https://npmjs.com/package/es-abstract /helpers/isPrimitive */\n    var isPrimitive = function isPrimitive(input) {\n        var type = typeof input;\n        return input === null || (type !== 'object' && type !== 'function');\n    };\n\n    var isActualNaN = $Number.isNaN || function isActualNaN(x) {\n        return x !== x;\n    };\n\n    var ES = {\n        // ES5 9.4\n        // http://es5.github.com/#x9.4\n        // http://jsperf.com/to-integer\n        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToInteger */\n        ToInteger: function ToInteger(num) {\n            var n = +num;\n            if (isActualNaN(n)) {\n                n = 0;\n            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {\n                n = (n > 0 || -1) * Math.floor(Math.abs(n));\n            }\n            return n;\n        },\n\n        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToPrimitive */\n        ToPrimitive: function ToPrimitive(input) {\n            var val, valueOf, toStr;\n            if (isPrimitive(input)) {\n                return input;\n            }\n            valueOf = input.valueOf;\n            if (isCallable(valueOf)) {\n                val = valueOf.call(input);\n                if (isPrimitive(val)) {\n                    return val;\n                }\n            }\n            toStr = input.toString;\n            if (isCallable(toStr)) {\n                val = toStr.call(input);\n                if (isPrimitive(val)) {\n                    return val;\n                }\n            }\n            throw new TypeError();\n        },\n\n        // ES5 9.9\n        // http://es5.github.com/#x9.9\n        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToObject */\n        ToObject: function (o) {\n            if (o == null) { // this matches both null and undefined\n                throw new TypeError(\"can't convert \" + o + ' to object');\n            }\n            return $Object(o);\n        },\n\n        /* replaceable with https://npmjs.com/package/es-abstract ES5.ToUint32 */\n        ToUint32: function ToUint32(x) {\n            return x >>> 0;\n        }\n    };\n\n    //\n    // Function\n    // ========\n    //\n\n    // ES-5 15.3.4.5\n    // http://es5.github.com/#x15.3.4.5\n\n    var Empty = function Empty() {};\n\n    defineProperties(FunctionPrototype, {\n        bind: function bind(that) { // .length is 1\n            // 1. Let Target be the this value.\n            var target = this;\n            // 2. If IsCallable(Target) is false, throw a TypeError exception.\n            if (!isCallable(target)) {\n                throw new TypeError('Function.prototype.bind called on incompatible ' + target);\n            }\n            // 3. Let A be a new (possibly empty) internal list of all of the\n            //   argument values provided after thisArg (arg1, arg2 etc), in order.\n            // XXX slicedArgs will stand in for \"A\" if used\n            var args = array_slice.call(arguments, 1); // for normal call\n            // 4. Let F be a new native ECMAScript object.\n            // 11. Set the [[Prototype]] internal property of F to the standard\n            //   built-in Function prototype object as specified in 15.3.3.1.\n            // 12. Set the [[Call]] internal property of F as described in\n            //   15.3.4.5.1.\n            // 13. Set the [[Construct]] internal property of F as described in\n            //   15.3.4.5.2.\n            // 14. Set the [[HasInstance]] internal property of F as described in\n            //   15.3.4.5.3.\n            var bound;\n            var binder = function () {\n\n                if (this instanceof bound) {\n                    // 15.3.4.5.2 [[Construct]]\n                    // When the [[Construct]] internal method of a function object,\n                    // F that was created using the bind function is called with a\n                    // list of arguments ExtraArgs, the following steps are taken:\n                    // 1. Let target be the value of F's [[TargetFunction]]\n                    //   internal property.\n                    // 2. If target has no [[Construct]] internal method, a\n                    //   TypeError exception is thrown.\n                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal\n                    //   property.\n                    // 4. Let args be a new list containing the same values as the\n                    //   list boundArgs in the same order followed by the same\n                    //   values as the list ExtraArgs in the same order.\n                    // 5. Return the result of calling the [[Construct]] internal\n                    //   method of target providing args as the arguments.\n\n                    var result = apply.call(\n                        target,\n                        this,\n                        array_concat.call(args, array_slice.call(arguments))\n                    );\n                    if ($Object(result) === result) {\n                        return result;\n                    }\n                    return this;\n\n                } else {\n                    // 15.3.4.5.1 [[Call]]\n                    // When the [[Call]] internal method of a function object, F,\n                    // which was created using the bind function is called with a\n                    // this value and a list of arguments ExtraArgs, the following\n                    // steps are taken:\n                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal\n                    //   property.\n                    // 2. Let boundThis be the value of F's [[BoundThis]] internal\n                    //   property.\n                    // 3. Let target be the value of F's [[TargetFunction]] internal\n                    //   property.\n                    // 4. Let args be a new list containing the same values as the\n                    //   list boundArgs in the same order followed by the same\n                    //   values as the list ExtraArgs in the same order.\n                    // 5. Return the result of calling the [[Call]] internal method\n                    //   of target providing boundThis as the this value and\n                    //   providing args as the arguments.\n\n                    // equiv: target.call(this, ...boundArgs, ...args)\n                    return apply.call(\n                        target,\n                        that,\n                        array_concat.call(args, array_slice.call(arguments))\n                    );\n\n                }\n\n            };\n\n            // 15. If the [[Class]] internal property of Target is \"Function\", then\n            //     a. Let L be the length property of Target minus the length of A.\n            //     b. Set the length own property of F to either 0 or L, whichever is\n            //       larger.\n            // 16. Else set the length own property of F to 0.\n\n            var boundLength = max(0, target.length - args.length);\n\n            // 17. Set the attributes of the length own property of F to the values\n            //   specified in 15.3.5.1.\n            var boundArgs = [];\n            for (var i = 0; i < boundLength; i++) {\n                array_push.call(boundArgs, '$' + i);\n            }\n\n            // XXX Build a dynamic function with desired amount of arguments is the only\n            // way to set the length property of a function.\n            // In environments where Content Security Policies enabled (Chrome extensions,\n            // for ex.) all use of eval or Function costructor throws an exception.\n            // However in all of these environments Function.prototype.bind exists\n            // and so this code will never be executed.\n            bound = $Function('binder', 'return function (' + array_join.call(boundArgs, ',') + '){ return binder.apply(this, arguments); }')(binder);\n\n            if (target.prototype) {\n                Empty.prototype = target.prototype;\n                bound.prototype = new Empty();\n                // Clean up dangling references.\n                Empty.prototype = null;\n            }\n\n            // TODO\n            // 18. Set the [[Extensible]] internal property of F to true.\n\n            // TODO\n            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).\n            // 20. Call the [[DefineOwnProperty]] internal method of F with\n            //   arguments \"caller\", PropertyDescriptor {[[Get]]: thrower, [[Set]]:\n            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and\n            //   false.\n            // 21. Call the [[DefineOwnProperty]] internal method of F with\n            //   arguments \"arguments\", PropertyDescriptor {[[Get]]: thrower,\n            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},\n            //   and false.\n\n            // TODO\n            // NOTE Function objects created using Function.prototype.bind do not\n            // have a prototype property or the [[Code]], [[FormalParameters]], and\n            // [[Scope]] internal properties.\n            // XXX can't delete prototype in pure-js.\n\n            // 22. Return F.\n            return bound;\n        }\n    });\n\n    // _Please note: Shortcuts are defined after `Function.prototype.bind` as we\n    // use it in defining shortcuts.\n    var owns = call.bind(ObjectPrototype.hasOwnProperty);\n    var toStr = call.bind(ObjectPrototype.toString);\n    var arraySlice = call.bind(array_slice);\n    var arraySliceApply = apply.bind(array_slice);\n    /* globals document */\n    if (typeof document === 'object' && document && document.documentElement) {\n        try {\n            arraySlice(document.documentElement.childNodes);\n        } catch (e) {\n            var origArraySlice = arraySlice;\n            var origArraySliceApply = arraySliceApply;\n            arraySlice = function arraySliceIE(arr) {\n                var r = [];\n                var i = arr.length;\n                while (i-- > 0) {\n                    r[i] = arr[i];\n                }\n                return origArraySliceApply(r, origArraySlice(arguments, 1));\n            };\n            arraySliceApply = function arraySliceApplyIE(arr, args) {\n                return origArraySliceApply(arraySlice(arr), args);\n            };\n        }\n    }\n    var strSlice = call.bind(StringPrototype.slice);\n    var strSplit = call.bind(StringPrototype.split);\n    var strIndexOf = call.bind(StringPrototype.indexOf);\n    var pushCall = call.bind(array_push);\n    var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);\n    var arraySort = call.bind(ArrayPrototype.sort);\n\n    //\n    // Array\n    // =====\n    //\n\n    var isArray = $Array.isArray || function isArray(obj) {\n        return toStr(obj) === '[object Array]';\n    };\n\n    // ES5 15.4.4.12\n    // http://es5.github.com/#x15.4.4.13\n    // Return len+argCount.\n    // [bugfix, ielt8]\n    // IE < 8 bug: [].unshift(0) === undefined but should be \"1\"\n    var hasUnshiftReturnValueBug = [].unshift(0) !== 1;\n    defineProperties(ArrayPrototype, {\n        unshift: function () {\n            array_unshift.apply(this, arguments);\n            return this.length;\n        }\n    }, hasUnshiftReturnValueBug);\n\n    // ES5 15.4.3.2\n    // http://es5.github.com/#x15.4.3.2\n    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray\n    defineProperties($Array, { isArray: isArray });\n\n    // The IsCallable() check in the Array functions\n    // has been replaced with a strict check on the\n    // internal class of the object to trap cases where\n    // the provided function was actually a regular\n    // expression literal, which in V8 and\n    // JavaScriptCore is a typeof \"function\".  Only in\n    // V8 are regular expression literals permitted as\n    // reduce parameters, so it is desirable in the\n    // general case for the shim to match the more\n    // strict and common behavior of rejecting regular\n    // expressions.\n\n    // ES5 15.4.4.18\n    // http://es5.github.com/#x15.4.4.18\n    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach\n\n    // Check failure of by-index access of string characters (IE < 9)\n    // and failure of `0 in boxedString` (Rhino)\n    var boxedString = $Object('a');\n    var splitString = boxedString[0] !== 'a' || !(0 in boxedString);\n\n    var properlyBoxesContext = function properlyBoxed(method) {\n        // Check node 0.6.21 bug where third parameter is not boxed\n        var properlyBoxesNonStrict = true;\n        var properlyBoxesStrict = true;\n        var threwException = false;\n        if (method) {\n            try {\n                method.call('foo', function (_, __, context) {\n                    if (typeof context !== 'object') {\n                        properlyBoxesNonStrict = false;\n                    }\n                });\n\n                method.call([1], function () {\n                    'use strict';\n\n                    properlyBoxesStrict = typeof this === 'string';\n                }, 'x');\n            } catch (e) {\n                threwException = true;\n            }\n        }\n        return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;\n    };\n\n    defineProperties(ArrayPrototype, {\n        forEach: function forEach(callbackfn/*, thisArg*/) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var i = -1;\n            var length = ES.ToUint32(self.length);\n            var T;\n            if (arguments.length > 1) {\n                T = arguments[1];\n            }\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.forEach callback must be a function');\n            }\n\n            while (++i < length) {\n                if (i in self) {\n                    // Invoke the callback function with call, passing arguments:\n                    // context, property value, property key, thisArg object\n                    if (typeof T === 'undefined') {\n                        callbackfn(self[i], i, object);\n                    } else {\n                        callbackfn.call(T, self[i], i, object);\n                    }\n                }\n            }\n        }\n    }, !properlyBoxesContext(ArrayPrototype.forEach));\n\n    // ES5 15.4.4.19\n    // http://es5.github.com/#x15.4.4.19\n    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map\n    defineProperties(ArrayPrototype, {\n        map: function map(callbackfn/*, thisArg*/) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var length = ES.ToUint32(self.length);\n            var result = $Array(length);\n            var T;\n            if (arguments.length > 1) {\n                T = arguments[1];\n            }\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.map callback must be a function');\n            }\n\n            for (var i = 0; i < length; i++) {\n                if (i in self) {\n                    if (typeof T === 'undefined') {\n                        result[i] = callbackfn(self[i], i, object);\n                    } else {\n                        result[i] = callbackfn.call(T, self[i], i, object);\n                    }\n                }\n            }\n            return result;\n        }\n    }, !properlyBoxesContext(ArrayPrototype.map));\n\n    // ES5 15.4.4.20\n    // http://es5.github.com/#x15.4.4.20\n    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter\n    defineProperties(ArrayPrototype, {\n        filter: function filter(callbackfn/*, thisArg*/) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var length = ES.ToUint32(self.length);\n            var result = [];\n            var value;\n            var T;\n            if (arguments.length > 1) {\n                T = arguments[1];\n            }\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.filter callback must be a function');\n            }\n\n            for (var i = 0; i < length; i++) {\n                if (i in self) {\n                    value = self[i];\n                    if (typeof T === 'undefined' ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {\n                        pushCall(result, value);\n                    }\n                }\n            }\n            return result;\n        }\n    }, !properlyBoxesContext(ArrayPrototype.filter));\n\n    // ES5 15.4.4.16\n    // http://es5.github.com/#x15.4.4.16\n    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every\n    defineProperties(ArrayPrototype, {\n        every: function every(callbackfn/*, thisArg*/) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var length = ES.ToUint32(self.length);\n            var T;\n            if (arguments.length > 1) {\n                T = arguments[1];\n            }\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.every callback must be a function');\n            }\n\n            for (var i = 0; i < length; i++) {\n                if (i in self && !(typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {\n                    return false;\n                }\n            }\n            return true;\n        }\n    }, !properlyBoxesContext(ArrayPrototype.every));\n\n    // ES5 15.4.4.17\n    // http://es5.github.com/#x15.4.4.17\n    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some\n    defineProperties(ArrayPrototype, {\n        some: function some(callbackfn/*, thisArg */) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var length = ES.ToUint32(self.length);\n            var T;\n            if (arguments.length > 1) {\n                T = arguments[1];\n            }\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.some callback must be a function');\n            }\n\n            for (var i = 0; i < length; i++) {\n                if (i in self && (typeof T === 'undefined' ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {\n                    return true;\n                }\n            }\n            return false;\n        }\n    }, !properlyBoxesContext(ArrayPrototype.some));\n\n    // ES5 15.4.4.21\n    // http://es5.github.com/#x15.4.4.21\n    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce\n    var reduceCoercesToObject = false;\n    if (ArrayPrototype.reduce) {\n        reduceCoercesToObject = typeof ArrayPrototype.reduce.call('es5', function (_, __, ___, list) {\n            return list;\n        }) === 'object';\n    }\n    defineProperties(ArrayPrototype, {\n        reduce: function reduce(callbackfn/*, initialValue*/) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var length = ES.ToUint32(self.length);\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.reduce callback must be a function');\n            }\n\n            // no value to return if no initial value and an empty array\n            if (length === 0 && arguments.length === 1) {\n                throw new TypeError('reduce of empty array with no initial value');\n            }\n\n            var i = 0;\n            var result;\n            if (arguments.length >= 2) {\n                result = arguments[1];\n            } else {\n                do {\n                    if (i in self) {\n                        result = self[i++];\n                        break;\n                    }\n\n                    // if array contains no values, no initial value to return\n                    if (++i >= length) {\n                        throw new TypeError('reduce of empty array with no initial value');\n                    }\n                } while (true);\n            }\n\n            for (; i < length; i++) {\n                if (i in self) {\n                    result = callbackfn(result, self[i], i, object);\n                }\n            }\n\n            return result;\n        }\n    }, !reduceCoercesToObject);\n\n    // ES5 15.4.4.22\n    // http://es5.github.com/#x15.4.4.22\n    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight\n    var reduceRightCoercesToObject = false;\n    if (ArrayPrototype.reduceRight) {\n        reduceRightCoercesToObject = typeof ArrayPrototype.reduceRight.call('es5', function (_, __, ___, list) {\n            return list;\n        }) === 'object';\n    }\n    defineProperties(ArrayPrototype, {\n        reduceRight: function reduceRight(callbackfn/*, initial*/) {\n            var object = ES.ToObject(this);\n            var self = splitString && isString(this) ? strSplit(this, '') : object;\n            var length = ES.ToUint32(self.length);\n\n            // If no callback function or if callback is not a callable function\n            if (!isCallable(callbackfn)) {\n                throw new TypeError('Array.prototype.reduceRight callback must be a function');\n            }\n\n            // no value to return if no initial value, empty array\n            if (length === 0 && arguments.length === 1) {\n                throw new TypeError('reduceRight of empty array with no initial value');\n            }\n\n            var result;\n            var i = length - 1;\n            if (arguments.length >= 2) {\n                result = arguments[1];\n            } else {\n                do {\n                    if (i in self) {\n                        result = self[i--];\n                        break;\n                    }\n\n                    // if array contains no values, no initial value to return\n                    if (--i < 0) {\n                        throw new TypeError('reduceRight of empty array with no initial value');\n                    }\n                } while (true);\n            }\n\n            if (i < 0) {\n                return result;\n            }\n\n            do {\n                if (i in self) {\n                    result = callbackfn(result, self[i], i, object);\n                }\n            } while (i--);\n\n            return result;\n        }\n    }, !reduceRightCoercesToObject);\n\n    // ES5 15.4.4.14\n    // http://es5.github.com/#x15.4.4.14\n    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf\n    var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;\n    defineProperties(ArrayPrototype, {\n        indexOf: function indexOf(searchElement/*, fromIndex */) {\n            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);\n            var length = ES.ToUint32(self.length);\n\n            if (length === 0) {\n                return -1;\n            }\n\n            var i = 0;\n            if (arguments.length > 1) {\n                i = ES.ToInteger(arguments[1]);\n            }\n\n            // handle negative indices\n            i = i >= 0 ? i : max(0, length + i);\n            for (; i < length; i++) {\n                if (i in self && self[i] === searchElement) {\n                    return i;\n                }\n            }\n            return -1;\n        }\n    }, hasFirefox2IndexOfBug);\n\n    // ES5 15.4.4.15\n    // http://es5.github.com/#x15.4.4.15\n    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf\n    var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;\n    defineProperties(ArrayPrototype, {\n        lastIndexOf: function lastIndexOf(searchElement/*, fromIndex */) {\n            var self = splitString && isString(this) ? strSplit(this, '') : ES.ToObject(this);\n            var length = ES.ToUint32(self.length);\n\n            if (length === 0) {\n                return -1;\n            }\n            var i = length - 1;\n            if (arguments.length > 1) {\n                i = min(i, ES.ToInteger(arguments[1]));\n            }\n            // handle negative indices\n            i = i >= 0 ? i : length - Math.abs(i);\n            for (; i >= 0; i--) {\n                if (i in self && searchElement === self[i]) {\n                    return i;\n                }\n            }\n            return -1;\n        }\n    }, hasFirefox2LastIndexOfBug);\n\n    // ES5 15.4.4.12\n    // http://es5.github.com/#x15.4.4.12\n    var spliceNoopReturnsEmptyArray = (function () {\n        var a = [1, 2];\n        var result = a.splice();\n        return a.length === 2 && isArray(result) && result.length === 0;\n    }());\n    defineProperties(ArrayPrototype, {\n        // Safari 5.0 bug where .splice() returns undefined\n        splice: function splice(start, deleteCount) {\n            if (arguments.length === 0) {\n                return [];\n            } else {\n                return array_splice.apply(this, arguments);\n            }\n        }\n    }, !spliceNoopReturnsEmptyArray);\n\n    var spliceWorksWithEmptyObject = (function () {\n        var obj = {};\n        ArrayPrototype.splice.call(obj, 0, 0, 1);\n        return obj.length === 1;\n    }());\n    defineProperties(ArrayPrototype, {\n        splice: function splice(start, deleteCount) {\n            if (arguments.length === 0) {\n                return [];\n            }\n            var args = arguments;\n            this.length = max(ES.ToInteger(this.length), 0);\n            if (arguments.length > 0 && typeof deleteCount !== 'number') {\n                args = arraySlice(arguments);\n                if (args.length < 2) {\n                    pushCall(args, this.length - start);\n                } else {\n                    args[1] = ES.ToInteger(deleteCount);\n                }\n            }\n            return array_splice.apply(this, args);\n        }\n    }, !spliceWorksWithEmptyObject);\n    var spliceWorksWithLargeSparseArrays = (function () {\n        // Per https://github.com/es-shims/es5-shim/issues/295\n        // Safari 7/8 breaks with sparse arrays of size 1e5 or greater\n        var arr = new $Array(1e5);\n        // note: the index MUST be 8 or larger or the test will false pass\n        arr[8] = 'x';\n        arr.splice(1, 1);\n        // note: this test must be defined *after* the indexOf shim\n        // per https://github.com/es-shims/es5-shim/issues/313\n        return arr.indexOf('x') === 7;\n    }());\n    var spliceWorksWithSmallSparseArrays = (function () {\n        // Per https://github.com/es-shims/es5-shim/issues/295\n        // Opera 12.15 breaks on this, no idea why.\n        var n = 256;\n        var arr = [];\n        arr[n] = 'a';\n        arr.splice(n + 1, 0, 'b');\n        return arr[n] === 'a';\n    }());\n    defineProperties(ArrayPrototype, {\n        splice: function splice(start, deleteCount) {\n            var O = ES.ToObject(this);\n            var A = [];\n            var len = ES.ToUint32(O.length);\n            var relativeStart = ES.ToInteger(start);\n            var actualStart = relativeStart < 0 ? max((len + relativeStart), 0) : min(relativeStart, len);\n            var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);\n\n            var k = 0;\n            var from;\n            while (k < actualDeleteCount) {\n                from = $String(actualStart + k);\n                if (owns(O, from)) {\n                    A[k] = O[from];\n                }\n                k += 1;\n            }\n\n            var items = arraySlice(arguments, 2);\n            var itemCount = items.length;\n            var to;\n            if (itemCount < actualDeleteCount) {\n                k = actualStart;\n                var maxK = len - actualDeleteCount;\n                while (k < maxK) {\n                    from = $String(k + actualDeleteCount);\n                    to = $String(k + itemCount);\n                    if (owns(O, from)) {\n                        O[to] = O[from];\n                    } else {\n                        delete O[to];\n                    }\n                    k += 1;\n                }\n                k = len;\n                var minK = len - actualDeleteCount + itemCount;\n                while (k > minK) {\n                    delete O[k - 1];\n                    k -= 1;\n                }\n            } else if (itemCount > actualDeleteCount) {\n                k = len - actualDeleteCount;\n                while (k > actualStart) {\n                    from = $String(k + actualDeleteCount - 1);\n                    to = $String(k + itemCount - 1);\n                    if (owns(O, from)) {\n                        O[to] = O[from];\n                    } else {\n                        delete O[to];\n                    }\n                    k -= 1;\n                }\n            }\n            k = actualStart;\n            for (var i = 0; i < items.length; ++i) {\n                O[k] = items[i];\n                k += 1;\n            }\n            O.length = len - actualDeleteCount + itemCount;\n\n            return A;\n        }\n    }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);\n\n    var originalJoin = ArrayPrototype.join;\n    var hasStringJoinBug;\n    try {\n        hasStringJoinBug = Array.prototype.join.call('123', ',') !== '1,2,3';\n    } catch (e) {\n        hasStringJoinBug = true;\n    }\n    if (hasStringJoinBug) {\n        defineProperties(ArrayPrototype, {\n            join: function join(separator) {\n                var sep = typeof separator === 'undefined' ? ',' : separator;\n                return originalJoin.call(isString(this) ? strSplit(this, '') : this, sep);\n            }\n        }, hasStringJoinBug);\n    }\n\n    var hasJoinUndefinedBug = [1, 2].join(undefined) !== '1,2';\n    if (hasJoinUndefinedBug) {\n        defineProperties(ArrayPrototype, {\n            join: function join(separator) {\n                var sep = typeof separator === 'undefined' ? ',' : separator;\n                return originalJoin.call(this, sep);\n            }\n        }, hasJoinUndefinedBug);\n    }\n\n    var pushShim = function push(item) {\n        var O = ES.ToObject(this);\n        var n = ES.ToUint32(O.length);\n        var i = 0;\n        while (i < arguments.length) {\n            O[n + i] = arguments[i];\n            i += 1;\n        }\n        O.length = n + i;\n        return n + i;\n    };\n\n    var pushIsNotGeneric = (function () {\n        var obj = {};\n        var result = Array.prototype.push.call(obj, undefined);\n        return result !== 1 || obj.length !== 1 || typeof obj[0] !== 'undefined' || !owns(obj, 0);\n    }());\n    defineProperties(ArrayPrototype, {\n        push: function push(item) {\n            if (isArray(this)) {\n                return array_push.apply(this, arguments);\n            }\n            return pushShim.apply(this, arguments);\n        }\n    }, pushIsNotGeneric);\n\n    // This fixes a very weird bug in Opera 10.6 when pushing `undefined\n    var pushUndefinedIsWeird = (function () {\n        var arr = [];\n        var result = arr.push(undefined);\n        return result !== 1 || arr.length !== 1 || typeof arr[0] !== 'undefined' || !owns(arr, 0);\n    }());\n    defineProperties(ArrayPrototype, { push: pushShim }, pushUndefinedIsWeird);\n\n    // ES5 15.2.3.14\n    // http://es5.github.io/#x15.4.4.10\n    // Fix boxed string bug\n    defineProperties(ArrayPrototype, {\n        slice: function (start, end) {\n            var arr = isString(this) ? strSplit(this, '') : this;\n            return arraySliceApply(arr, arguments);\n        }\n    }, splitString);\n\n    var sortIgnoresNonFunctions = (function () {\n        try {\n            [1, 2].sort(null);\n        } catch (e) {\n            try {\n                [1, 2].sort({});\n            } catch (e2) {\n                return false;\n            }\n        }\n        return true;\n    }());\n    var sortThrowsOnRegex = (function () {\n        // this is a problem in Firefox 4, in which `typeof /a/ === 'function'`\n        try {\n            [1, 2].sort(/a/);\n            return false;\n        } catch (e) {}\n        return true;\n    }());\n    var sortIgnoresUndefined = (function () {\n        // applies in IE 8, for one.\n        try {\n            [1, 2].sort(undefined);\n            return true;\n        } catch (e) {}\n        return false;\n    }());\n    defineProperties(ArrayPrototype, {\n        sort: function sort(compareFn) {\n            if (typeof compareFn === 'undefined') {\n                return arraySort(this);\n            }\n            if (!isCallable(compareFn)) {\n                throw new TypeError('Array.prototype.sort callback must be a function');\n            }\n            return arraySort(this, compareFn);\n        }\n    }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);\n\n    //\n    // Object\n    // ======\n    //\n\n    // ES5 15.2.3.14\n    // http://es5.github.com/#x15.2.3.14\n\n    // http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation\n    var hasDontEnumBug = !isEnum({ 'toString': null }, 'toString'); // jscs:ignore disallowQuotedKeysInObjects\n    var hasProtoEnumBug = isEnum(function () {}, 'prototype');\n    var hasStringEnumBug = !owns('x', '0');\n    var equalsConstructorPrototype = function (o) {\n        var ctor = o.constructor;\n        return ctor && ctor.prototype === o;\n    };\n    var excludedKeys = {\n        $window: true,\n        $console: true,\n        $parent: true,\n        $self: true,\n        $frame: true,\n        $frames: true,\n        $frameElement: true,\n        $webkitIndexedDB: true,\n        $webkitStorageInfo: true,\n        $external: true,\n        $width: true,\n        $height: true,\n        $top: true,\n        $localStorage: true\n    };\n    var hasAutomationEqualityBug = (function () {\n        /* globals window */\n        if (typeof window === 'undefined') {\n            return false;\n        }\n        for (var k in window) {\n            try {\n                if (!excludedKeys['$' + k] && owns(window, k) && window[k] !== null && typeof window[k] === 'object') {\n                    equalsConstructorPrototype(window[k]);\n                }\n            } catch (e) {\n                return true;\n            }\n        }\n        return false;\n    }());\n    var equalsConstructorPrototypeIfNotBuggy = function (object) {\n        if (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n            return equalsConstructorPrototype(object);\n        }\n        try {\n            return equalsConstructorPrototype(object);\n        } catch (e) {\n            return false;\n        }\n    };\n    var dontEnums = [\n        'toString',\n        'toLocaleString',\n        'valueOf',\n        'hasOwnProperty',\n        'isPrototypeOf',\n        'propertyIsEnumerable',\n        'constructor'\n    ];\n    var dontEnumsLength = dontEnums.length;\n\n    // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js\n    // can be replaced with require('is-arguments') if we ever use a build process instead\n    var isStandardArguments = function isArguments(value) {\n        return toStr(value) === '[object Arguments]';\n    };\n    var isLegacyArguments = function isArguments(value) {\n        return value !== null\n            && typeof value === 'object'\n            && typeof value.length === 'number'\n            && value.length >= 0\n            && !isArray(value)\n            && isCallable(value.callee);\n    };\n    var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;\n\n    defineProperties($Object, {\n        keys: function keys(object) {\n            var isFn = isCallable(object);\n            var isArgs = isArguments(object);\n            var isObject = object !== null && typeof object === 'object';\n            var isStr = isObject && isString(object);\n\n            if (!isObject && !isFn && !isArgs) {\n                throw new TypeError('Object.keys called on a non-object');\n            }\n\n            var theKeys = [];\n            var skipProto = hasProtoEnumBug && isFn;\n            if ((isStr && hasStringEnumBug) || isArgs) {\n                for (var i = 0; i < object.length; ++i) {\n                    pushCall(theKeys, $String(i));\n                }\n            }\n\n            if (!isArgs) {\n                for (var name in object) {\n                    if (!(skipProto && name === 'prototype') && owns(object, name)) {\n                        pushCall(theKeys, $String(name));\n                    }\n                }\n            }\n\n            if (hasDontEnumBug) {\n                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n                for (var j = 0; j < dontEnumsLength; j++) {\n                    var dontEnum = dontEnums[j];\n                    if (!(skipConstructor && dontEnum === 'constructor') && owns(object, dontEnum)) {\n                        pushCall(theKeys, dontEnum);\n                    }\n                }\n            }\n            return theKeys;\n        }\n    });\n\n    var keysWorksWithArguments = $Object.keys && (function () {\n        // Safari 5.0 bug\n        return $Object.keys(arguments).length === 2;\n    }(1, 2));\n    var keysHasArgumentsLengthBug = $Object.keys && (function () {\n        var argKeys = $Object.keys(arguments);\n        return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;\n    }(1));\n    var originalKeys = $Object.keys;\n    defineProperties($Object, {\n        keys: function keys(object) {\n            if (isArguments(object)) {\n                return originalKeys(arraySlice(object));\n            } else {\n                return originalKeys(object);\n            }\n        }\n    }, !keysWorksWithArguments || keysHasArgumentsLengthBug);\n\n    //\n    // Date\n    // ====\n    //\n\n    var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;\n    var aNegativeTestDate = new Date(-1509842289600292);\n    var aPositiveTestDate = new Date(1449662400000);\n    var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT';\n    var hasToDateStringFormatBug;\n    var hasToStringFormatBug;\n    var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();\n    if (timeZoneOffset < -720) {\n        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Tue Jan 02 -45875';\n        hasToStringFormatBug = !(/^Thu Dec 10 2015 \\d\\d:\\d\\d:\\d\\d GMT[-+]\\d\\d\\d\\d(?: |$)/).test(String(aPositiveTestDate));\n    } else {\n        hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== 'Mon Jan 01 -45875';\n        hasToStringFormatBug = !(/^Wed Dec 09 2015 \\d\\d:\\d\\d:\\d\\d GMT[-+]\\d\\d\\d\\d(?: |$)/).test(String(aPositiveTestDate));\n    }\n\n    var originalGetFullYear = call.bind(Date.prototype.getFullYear);\n    var originalGetMonth = call.bind(Date.prototype.getMonth);\n    var originalGetDate = call.bind(Date.prototype.getDate);\n    var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);\n    var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);\n    var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);\n    var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);\n    var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);\n    var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);\n    var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);\n    var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);\n    var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];\n    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\n    var daysInMonth = function daysInMonth(month, year) {\n        return originalGetDate(new Date(year, month, 0));\n    };\n\n    defineProperties(Date.prototype, {\n        getFullYear: function getFullYear() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var year = originalGetFullYear(this);\n            if (year < 0 && originalGetMonth(this) > 11) {\n                return year + 1;\n            }\n            return year;\n        },\n        getMonth: function getMonth() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var year = originalGetFullYear(this);\n            var month = originalGetMonth(this);\n            if (year < 0 && month > 11) {\n                return 0;\n            }\n            return month;\n        },\n        getDate: function getDate() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var year = originalGetFullYear(this);\n            var month = originalGetMonth(this);\n            var date = originalGetDate(this);\n            if (year < 0 && month > 11) {\n                if (month === 12) {\n                    return date;\n                }\n                var days = daysInMonth(0, year + 1);\n                return (days - date) + 1;\n            }\n            return date;\n        },\n        getUTCFullYear: function getUTCFullYear() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var year = originalGetUTCFullYear(this);\n            if (year < 0 && originalGetUTCMonth(this) > 11) {\n                return year + 1;\n            }\n            return year;\n        },\n        getUTCMonth: function getUTCMonth() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var year = originalGetUTCFullYear(this);\n            var month = originalGetUTCMonth(this);\n            if (year < 0 && month > 11) {\n                return 0;\n            }\n            return month;\n        },\n        getUTCDate: function getUTCDate() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var year = originalGetUTCFullYear(this);\n            var month = originalGetUTCMonth(this);\n            var date = originalGetUTCDate(this);\n            if (year < 0 && month > 11) {\n                if (month === 12) {\n                    return date;\n                }\n                var days = daysInMonth(0, year + 1);\n                return (days - date) + 1;\n            }\n            return date;\n        }\n    }, hasNegativeMonthYearBug);\n\n    defineProperties(Date.prototype, {\n        toUTCString: function toUTCString() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var day = originalGetUTCDay(this);\n            var date = originalGetUTCDate(this);\n            var month = originalGetUTCMonth(this);\n            var year = originalGetUTCFullYear(this);\n            var hour = originalGetUTCHours(this);\n            var minute = originalGetUTCMinutes(this);\n            var second = originalGetUTCSeconds(this);\n            return dayName[day] + ', '\n                + (date < 10 ? '0' + date : date) + ' '\n                + monthName[month] + ' '\n                + year + ' '\n                + (hour < 10 ? '0' + hour : hour) + ':'\n                + (minute < 10 ? '0' + minute : minute) + ':'\n                + (second < 10 ? '0' + second : second) + ' GMT';\n        }\n    }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);\n\n    // Opera 12 has `,`\n    defineProperties(Date.prototype, {\n        toDateString: function toDateString() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var day = this.getDay();\n            var date = this.getDate();\n            var month = this.getMonth();\n            var year = this.getFullYear();\n            return dayName[day] + ' '\n                + monthName[month] + ' '\n                + (date < 10 ? '0' + date : date) + ' '\n                + year;\n        }\n    }, hasNegativeMonthYearBug || hasToDateStringFormatBug);\n\n    // can't use defineProperties here because of toString enumeration issue in IE <= 8\n    if (hasNegativeMonthYearBug || hasToStringFormatBug) {\n        Date.prototype.toString = function toString() {\n            if (!this || !(this instanceof Date)) {\n                throw new TypeError('this is not a Date object.');\n            }\n            var day = this.getDay();\n            var date = this.getDate();\n            var month = this.getMonth();\n            var year = this.getFullYear();\n            var hour = this.getHours();\n            var minute = this.getMinutes();\n            var second = this.getSeconds();\n            var timezoneOffset = this.getTimezoneOffset();\n            var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);\n            var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);\n            return dayName[day] + ' '\n                + monthName[month] + ' '\n                + (date < 10 ? '0' + date : date) + ' '\n                + year + ' '\n                + (hour < 10 ? '0' + hour : hour) + ':'\n                + (minute < 10 ? '0' + minute : minute) + ':'\n                + (second < 10 ? '0' + second : second) + ' GMT'\n                + (timezoneOffset > 0 ? '-' : '+')\n                + (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset)\n                + (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);\n        };\n        if (supportsDescriptors) {\n            $Object.defineProperty(Date.prototype, 'toString', {\n                configurable: true,\n                enumerable: false,\n                writable: true\n            });\n        }\n    }\n\n    // ES5 15.9.5.43\n    // http://es5.github.com/#x15.9.5.43\n    // This function returns a String value represent the instance in time\n    // represented by this Date object. The format of the String is the Date Time\n    // string format defined in 15.9.1.15. All fields are present in the String.\n    // The time zone is always UTC, denoted by the suffix Z. If the time value of\n    // this object is not a finite Number a RangeError exception is thrown.\n    var negativeDate = -62198755200000;\n    var negativeYearString = '-000001';\n    var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1; // eslint-disable-line max-len\n    var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';\n\n    var getTime = call.bind(Date.prototype.getTime);\n\n    defineProperties(Date.prototype, {\n        toISOString: function toISOString() {\n            if (!isFinite(this) || !isFinite(getTime(this))) {\n                // Adope Photoshop requires the second check.\n                throw new RangeError('Date.prototype.toISOString called on non-finite value.');\n            }\n\n            var year = originalGetUTCFullYear(this);\n\n            var month = originalGetUTCMonth(this);\n            // see https://github.com/es-shims/es5-shim/issues/111\n            year += Math.floor(month / 12);\n            month = ((month % 12) + 12) % 12;\n\n            // the date time string format is specified in 15.9.1.15.\n            var result = [\n                month + 1,\n                originalGetUTCDate(this),\n                originalGetUTCHours(this),\n                originalGetUTCMinutes(this),\n                originalGetUTCSeconds(this)\n            ];\n            year = (\n                (year < 0 ? '-' : (year > 9999 ? '+' : ''))\n                + strSlice('00000' + Math.abs(year), (0 <= year && year <= 9999) ? -4 : -6)\n            );\n\n            for (var i = 0; i < result.length; ++i) {\n                // pad months, days, hours, minutes, and seconds to have two digits.\n                result[i] = strSlice('00' + result[i], -2);\n            }\n            // pad milliseconds to have three digits.\n            return (\n                year + '-' + arraySlice(result, 0, 2).join('-')\n                + 'T' + arraySlice(result, 2).join(':') + '.'\n                + strSlice('000' + originalGetUTCMilliseconds(this), -3) + 'Z'\n            );\n        }\n    }, hasNegativeDateBug || hasSafari51DateBug);\n\n    // ES5 15.9.5.44\n    // http://es5.github.com/#x15.9.5.44\n    // This function provides a String representation of a Date object for use by\n    // JSON.stringify (15.12.3).\n    var dateToJSONIsSupported = (function () {\n        try {\n            return Date.prototype.toJSON\n                && new Date(NaN).toJSON() === null\n                && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1\n                && Date.prototype.toJSON.call({ // generic\n                    toISOString: function () { return true; }\n                });\n        } catch (e) {\n            return false;\n        }\n    }());\n    if (!dateToJSONIsSupported) {\n        Date.prototype.toJSON = function toJSON(key) {\n            // When the toJSON method is called with argument key, the following\n            // steps are taken:\n\n            // 1.  Let O be the result of calling ToObject, giving it the this\n            // value as its argument.\n            // 2. Let tv be ES.ToPrimitive(O, hint Number).\n            var O = $Object(this);\n            var tv = ES.ToPrimitive(O);\n            // 3. If tv is a Number and is not finite, return null.\n            if (typeof tv === 'number' && !isFinite(tv)) {\n                return null;\n            }\n            // 4. Let toISO be the result of calling the [[Get]] internal method of\n            // O with argument \"toISOString\".\n            var toISO = O.toISOString;\n            // 5. If IsCallable(toISO) is false, throw a TypeError exception.\n            if (!isCallable(toISO)) {\n                throw new TypeError('toISOString property is not callable');\n            }\n            // 6. Return the result of calling the [[Call]] internal method of\n            //  toISO with O as the this value and an empty argument list.\n            return toISO.call(O);\n\n            // NOTE 1 The argument is ignored.\n\n            // NOTE 2 The toJSON function is intentionally generic; it does not\n            // require that its this value be a Date object. Therefore, it can be\n            // transferred to other kinds of objects for use as a method. However,\n            // it does require that any such object have a toISOString method. An\n            // object is free to use the argument key to filter its\n            // stringification.\n        };\n    }\n\n    // ES5 15.9.4.2\n    // http://es5.github.com/#x15.9.4.2\n    // based on work shared by Daniel Friesen (dantman)\n    // http://gist.github.com/303249\n    var supportsExtendedYears = Date.parse('+033658-09-27T01:46:40.000Z') === 1e15;\n    var acceptsInvalidDates = !isNaN(Date.parse('2012-04-04T24:00:00.500Z')) || !isNaN(Date.parse('2012-11-31T23:59:59.000Z')) || !isNaN(Date.parse('2012-12-31T23:59:60.000Z'));\n    var doesNotParseY2KNewYear = isNaN(Date.parse('2000-01-01T00:00:00.000Z'));\n    if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {\n        // XXX global assignment won't work in embeddings that use\n        // an alternate object for the context.\n        /* global Date: true */\n        var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;\n        var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());\n        // eslint-disable-next-line no-implicit-globals, no-global-assign\n        Date = (function (NativeDate) {\n            // Date.length === 7\n            var DateShim = function Date(Y, M, D, h, m, s, ms) {\n                var length = arguments.length;\n                var date;\n                if (this instanceof NativeDate) {\n                    var seconds = s;\n                    var millis = ms;\n                    if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {\n                        // work around a Safari 8/9 bug where it treats the seconds as signed\n                        var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;\n                        var sToShift = Math.floor(msToShift / 1e3);\n                        seconds += sToShift;\n                        millis -= sToShift * 1e3;\n                    }\n                    date = length === 1 && $String(Y) === Y // isString(Y)\n                        // We explicitly pass it through parse:\n                        ? new NativeDate(DateShim.parse(Y))\n                        // We have to manually make calls depending on argument\n                        // length here\n                        : length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis)\n                            : length >= 6 ? new NativeDate(Y, M, D, h, m, seconds)\n                                : length >= 5 ? new NativeDate(Y, M, D, h, m)\n                                    : length >= 4 ? new NativeDate(Y, M, D, h)\n                                        : length >= 3 ? new NativeDate(Y, M, D)\n                                            : length >= 2 ? new NativeDate(Y, M)\n                                                : length >= 1 ? new NativeDate(Y instanceof NativeDate ? +Y : Y)\n                                                    : new NativeDate();\n                } else {\n                    date = NativeDate.apply(this, arguments);\n                }\n                if (!isPrimitive(date)) {\n                    // Prevent mixups with unfixed Date object\n                    defineProperties(date, { constructor: DateShim }, true);\n                }\n                return date;\n            };\n\n            // 15.9.1.15 Date Time String Format.\n            var isoDateExpression = new RegExp('^'\n                + '(\\\\d{4}|[+-]\\\\d{6})' // four-digit year capture or sign + 6-digit extended year\n                + '(?:-(\\\\d{2})' // optional month capture\n                + '(?:-(\\\\d{2})' // optional day capture\n                + '(?:' // capture hours:minutes:seconds.milliseconds\n                    + 'T(\\\\d{2})' // hours capture\n                    + ':(\\\\d{2})' // minutes capture\n                    + '(?:' // optional :seconds.milliseconds\n                        + ':(\\\\d{2})' // seconds capture\n                        + '(?:(\\\\.\\\\d{1,}))?' // milliseconds capture\n                    + ')?'\n                + '(' // capture UTC offset component\n                    + 'Z|' // UTC capture\n                    + '(?:' // offset specifier +/-hours:minutes\n                        + '([-+])' // sign capture\n                        + '(\\\\d{2})' // hours offset capture\n                        + ':(\\\\d{2})' // minutes offset capture\n                    + ')'\n                + ')?)?)?)?'\n            + '$');\n\n            var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];\n\n            var dayFromMonth = function dayFromMonth(year, month) {\n                var t = month > 1 ? 1 : 0;\n                return (\n                    months[month]\n                    + Math.floor((year - 1969 + t) / 4)\n                    - Math.floor((year - 1901 + t) / 100)\n                    + Math.floor((year - 1601 + t) / 400)\n                    + (365 * (year - 1970))\n                );\n            };\n\n            var toUTC = function toUTC(t) {\n                var s = 0;\n                var ms = t;\n                if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {\n                    // work around a Safari 8/9 bug where it treats the seconds as signed\n                    var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;\n                    var sToShift = Math.floor(msToShift / 1e3);\n                    s += sToShift;\n                    ms -= sToShift * 1e3;\n                }\n                return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));\n            };\n\n            // Copy any custom methods a 3rd party library may have added\n            for (var key in NativeDate) {\n                if (owns(NativeDate, key)) {\n                    DateShim[key] = NativeDate[key];\n                }\n            }\n\n            // Copy \"native\" methods explicitly; they may be non-enumerable\n            defineProperties(DateShim, {\n                now: NativeDate.now,\n                UTC: NativeDate.UTC\n            }, true);\n            DateShim.prototype = NativeDate.prototype;\n            defineProperties(DateShim.prototype, { constructor: DateShim }, true);\n\n            // Upgrade Date.parse to handle simplified ISO 8601 strings\n            var parseShim = function parse(string) {\n                var match = isoDateExpression.exec(string);\n                if (match) {\n                    // parse months, days, hours, minutes, seconds, and milliseconds\n                    // provide default values if necessary\n                    // parse the UTC offset component\n                    var year = $Number(match[1]),\n                        month = $Number(match[2] || 1) - 1,\n                        day = $Number(match[3] || 1) - 1,\n                        hour = $Number(match[4] || 0),\n                        minute = $Number(match[5] || 0),\n                        second = $Number(match[6] || 0),\n                        millisecond = Math.floor($Number(match[7] || 0) * 1000),\n                        // When time zone is missed, local offset should be used\n                        // (ES 5.1 bug)\n                        // see https://bugs.ecmascript.org/show_bug.cgi?id=112\n                        isLocalTime = Boolean(match[4] && !match[8]),\n                        signOffset = match[9] === '-' ? 1 : -1,\n                        hourOffset = $Number(match[10] || 0),\n                        minuteOffset = $Number(match[11] || 0),\n                        result;\n                    var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;\n                    if (\n                        hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25)\n                        && minute < 60 && second < 60 && millisecond < 1000\n                        && month > -1 && month < 12 && hourOffset < 24\n                        && minuteOffset < 60 // detect invalid offsets\n                        && day > -1\n                        && day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))\n                    ) {\n                        result = (\n                            ((dayFromMonth(year, month) + day) * 24)\n                            + hour\n                            + (hourOffset * signOffset)\n                        ) * 60;\n                        result = ((\n                            ((result + minute + (minuteOffset * signOffset)) * 60)\n                            + second\n                        ) * 1000) + millisecond;\n                        if (isLocalTime) {\n                            result = toUTC(result);\n                        }\n                        if (-8.64e15 <= result && result <= 8.64e15) {\n                            return result;\n                        }\n                    }\n                    return NaN;\n                }\n                return NativeDate.parse.apply(this, arguments);\n            };\n            defineProperties(DateShim, { parse: parseShim });\n\n            return DateShim;\n        }(Date));\n        /* global Date: false */\n    }\n\n    // ES5 15.9.4.4\n    // http://es5.github.com/#x15.9.4.4\n    if (!Date.now) {\n        Date.now = function now() {\n            return new Date().getTime();\n        };\n    }\n\n    //\n    // Number\n    // ======\n    //\n\n    // ES5.1 15.7.4.5\n    // http://es5.github.com/#x15.7.4.5\n    var hasToFixedBugs = NumberPrototype.toFixed && (\n        (0.00008).toFixed(3) !== '0.000'\n        || (0.9).toFixed(0) !== '1'\n        || (1.255).toFixed(2) !== '1.25'\n        || (1000000000000000128).toFixed(0) !== '1000000000000000128'\n    );\n\n    var toFixedHelpers = {\n        base: 1e7,\n        size: 6,\n        data: [0, 0, 0, 0, 0, 0],\n        multiply: function multiply(n, c) {\n            var i = -1;\n            var c2 = c;\n            while (++i < toFixedHelpers.size) {\n                c2 += n * toFixedHelpers.data[i];\n                toFixedHelpers.data[i] = c2 % toFixedHelpers.base;\n                c2 = Math.floor(c2 / toFixedHelpers.base);\n            }\n        },\n        divide: function divide(n) {\n            var i = toFixedHelpers.size;\n            var c = 0;\n            while (--i >= 0) {\n                c += toFixedHelpers.data[i];\n                toFixedHelpers.data[i] = Math.floor(c / n);\n                c = (c % n) * toFixedHelpers.base;\n            }\n        },\n        numToString: function numToString() {\n            var i = toFixedHelpers.size;\n            var s = '';\n            while (--i >= 0) {\n                if (s !== '' || i === 0 || toFixedHelpers.data[i] !== 0) {\n                    var t = $String(toFixedHelpers.data[i]);\n                    if (s === '') {\n                        s = t;\n                    } else {\n                        s += strSlice('0000000', 0, 7 - t.length) + t;\n                    }\n                }\n            }\n            return s;\n        },\n        pow: function pow(x, n, acc) {\n            return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));\n        },\n        log: function log(x) {\n            var n = 0;\n            var x2 = x;\n            while (x2 >= 4096) {\n                n += 12;\n                x2 /= 4096;\n            }\n            while (x2 >= 2) {\n                n += 1;\n                x2 /= 2;\n            }\n            return n;\n        }\n    };\n\n    var toFixedShim = function toFixed(fractionDigits) {\n        var f, x, s, m, e, z, j, k;\n\n        // Test for NaN and round fractionDigits down\n        f = $Number(fractionDigits);\n        f = isActualNaN(f) ? 0 : Math.floor(f);\n\n        if (f < 0 || f > 20) {\n            throw new RangeError('Number.toFixed called with invalid number of decimals');\n        }\n\n        x = $Number(this);\n\n        if (isActualNaN(x)) {\n            return 'NaN';\n        }\n\n        // If it is too big or small, return the string value of the number\n        if (x <= -1e21 || x >= 1e21) {\n            return $String(x);\n        }\n\n        s = '';\n\n        if (x < 0) {\n            s = '-';\n            x = -x;\n        }\n\n        m = '0';\n\n        if (x > 1e-21) {\n            // 1e-21 < x < 1e21\n            // -70 < log2(x) < 70\n            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;\n            z = (e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1));\n            z *= 0x10000000000000; // Math.pow(2, 52);\n            e = 52 - e;\n\n            // -18 < e < 122\n            // x = z / 2 ^ e\n            if (e > 0) {\n                toFixedHelpers.multiply(0, z);\n                j = f;\n\n                while (j >= 7) {\n                    toFixedHelpers.multiply(1e7, 0);\n                    j -= 7;\n                }\n\n                toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);\n                j = e - 1;\n\n                while (j >= 23) {\n                    toFixedHelpers.divide(1 << 23);\n                    j -= 23;\n                }\n\n                toFixedHelpers.divide(1 << j);\n                toFixedHelpers.multiply(1, 1);\n                toFixedHelpers.divide(2);\n                m = toFixedHelpers.numToString();\n            } else {\n                toFixedHelpers.multiply(0, z);\n                toFixedHelpers.multiply(1 << (-e), 0);\n                m = toFixedHelpers.numToString() + strSlice('0.00000000000000000000', 2, 2 + f);\n            }\n        }\n\n        if (f > 0) {\n            k = m.length;\n\n            if (k <= f) {\n                m = s + strSlice('0.0000000000000000000', 0, f - k + 2) + m;\n            } else {\n                m = s + strSlice(m, 0, k - f) + '.' + strSlice(m, k - f);\n            }\n        } else {\n            m = s + m;\n        }\n\n        return m;\n    };\n    defineProperties(NumberPrototype, { toFixed: toFixedShim }, hasToFixedBugs);\n\n    var hasToPrecisionUndefinedBug = (function () {\n        try {\n            return 1.0.toPrecision(undefined) === '1';\n        } catch (e) {\n            return true;\n        }\n    }());\n    var originalToPrecision = NumberPrototype.toPrecision;\n    defineProperties(NumberPrototype, {\n        toPrecision: function toPrecision(precision) {\n            return typeof precision === 'undefined' ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);\n        }\n    }, hasToPrecisionUndefinedBug);\n\n    //\n    // String\n    // ======\n    //\n\n    // ES5 15.5.4.14\n    // http://es5.github.com/#x15.5.4.14\n\n    // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]\n    // Many browsers do not split properly with regular expressions or they\n    // do not perform the split correctly under obscure conditions.\n    // See http://blog.stevenlevithan.com/archives/cross-browser-split\n    // I've tested in many browsers and this seems to cover the deviant ones:\n    //    'ab'.split(/(?:ab)*/) should be [\"\", \"\"], not [\"\"]\n    //    '.'.split(/(.?)(.?)/) should be [\"\", \".\", \"\", \"\"], not [\"\", \"\"]\n    //    'tesst'.split(/(s)*/) should be [\"t\", undefined, \"e\", \"s\", \"t\"], not\n    //       [undefined, \"t\", undefined, \"e\", ...]\n    //    ''.split(/.?/) should be [], not [\"\"]\n    //    '.'.split(/()()/) should be [\".\"], not [\"\", \"\", \".\"]\n\n    if (\n        'ab'.split(/(?:ab)*/).length !== 2\n        || '.'.split(/(.?)(.?)/).length !== 4\n        || 'tesst'.split(/(s)*/)[1] === 't'\n        || 'test'.split(/(?:)/, -1).length !== 4\n        || ''.split(/.?/).length\n        || '.'.split(/()()/).length > 1\n    ) {\n        (function () {\n            var compliantExecNpcg = typeof (/()??/).exec('')[1] === 'undefined'; // NPCG: nonparticipating capturing group\n            var maxSafe32BitInt = Math.pow(2, 32) - 1;\n\n            StringPrototype.split = function (separator, limit) {\n                var string = String(this);\n                if (typeof separator === 'undefined' && limit === 0) {\n                    return [];\n                }\n\n                // If `separator` is not a regex, use native split\n                if (!isRegex(separator)) {\n                    return strSplit(this, separator, limit);\n                }\n\n                var output = [];\n                var flags = (separator.ignoreCase ? 'i' : '')\n                            + (separator.multiline ? 'm' : '')\n                            + (separator.unicode ? 'u' : '') // in ES6\n                            + (separator.sticky ? 'y' : ''), // Firefox 3+ and ES6\n                    lastLastIndex = 0,\n                    // Make `global` and avoid `lastIndex` issues by working with a copy\n                    separator2, match, lastIndex, lastLength;\n                var separatorCopy = new RegExp(separator.source, flags + 'g');\n                if (!compliantExecNpcg) {\n                    // Doesn't need flags gy, but they don't hurt\n                    separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\\\s)', flags);\n                }\n                /* Values for `limit`, per the spec:\n                 * If undefined: 4294967295 // maxSafe32BitInt\n                 * If 0, Infinity, or NaN: 0\n                 * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;\n                 * If negative number: 4294967296 - Math.floor(Math.abs(limit))\n                 * If other: Type-convert, then use the above rules\n                 */\n                var splitLimit = typeof limit === 'undefined' ? maxSafe32BitInt : ES.ToUint32(limit);\n                match = separatorCopy.exec(string);\n                while (match) {\n                    // `separatorCopy.lastIndex` is not reliable cross-browser\n                    lastIndex = match.index + match[0].length;\n                    if (lastIndex > lastLastIndex) {\n                        pushCall(output, strSlice(string, lastLastIndex, match.index));\n                        // Fix browsers whose `exec` methods don't consistently return `undefined` for\n                        // nonparticipating capturing groups\n                        if (!compliantExecNpcg && match.length > 1) {\n                            /* eslint-disable no-loop-func */\n                            match[0].replace(separator2, function () {\n                                for (var i = 1; i < arguments.length - 2; i++) {\n                                    if (typeof arguments[i] === 'undefined') {\n                                        match[i] = void 0;\n                                    }\n                                }\n                            });\n                            /* eslint-enable no-loop-func */\n                        }\n                        if (match.length > 1 && match.index < string.length) {\n                            array_push.apply(output, arraySlice(match, 1));\n                        }\n                        lastLength = match[0].length;\n                        lastLastIndex = lastIndex;\n                        if (output.length >= splitLimit) {\n                            break;\n                        }\n                    }\n                    if (separatorCopy.lastIndex === match.index) {\n                        separatorCopy.lastIndex++; // Avoid an infinite loop\n                    }\n                    match = separatorCopy.exec(string);\n                }\n                if (lastLastIndex === string.length) {\n                    if (lastLength || !separatorCopy.test('')) {\n                        pushCall(output, '');\n                    }\n                } else {\n                    pushCall(output, strSlice(string, lastLastIndex));\n                }\n                return output.length > splitLimit ? arraySlice(output, 0, splitLimit) : output;\n            };\n        }());\n\n    // [bugfix, chrome]\n    // If separator is undefined, then the result array contains just one String,\n    // which is the this value (converted to a String). If limit is not undefined,\n    // then the output array is truncated so that it contains no more than limit\n    // elements.\n    // \"0\".split(undefined, 0) -> []\n    } else if ('0'.split(void 0, 0).length) {\n        StringPrototype.split = function split(separator, limit) {\n            if (typeof separator === 'undefined' && limit === 0) {\n                return [];\n            }\n            return strSplit(this, separator, limit);\n        };\n    }\n\n    var str_replace = StringPrototype.replace;\n    var replaceReportsGroupsCorrectly = (function () {\n        var groups = [];\n        'x'.replace(/x(.)?/g, function (match, group) {\n            pushCall(groups, group);\n        });\n        return groups.length === 1 && typeof groups[0] === 'undefined';\n    }());\n\n    if (!replaceReportsGroupsCorrectly) {\n        StringPrototype.replace = function replace(searchValue, replaceValue) {\n            var isFn = isCallable(replaceValue);\n            var hasCapturingGroups = isRegex(searchValue) && (/\\)[*?]/).test(searchValue.source);\n            if (!isFn || !hasCapturingGroups) {\n                return str_replace.call(this, searchValue, replaceValue);\n            } else {\n                var wrappedReplaceValue = function (match) {\n                    var length = arguments.length;\n                    var originalLastIndex = searchValue.lastIndex;\n                    searchValue.lastIndex = 0;\n                    var args = searchValue.exec(match) || [];\n                    searchValue.lastIndex = originalLastIndex;\n                    pushCall(args, arguments[length - 2], arguments[length - 1]);\n                    return replaceValue.apply(this, args);\n                };\n                return str_replace.call(this, searchValue, wrappedReplaceValue);\n            }\n        };\n    }\n\n    // ECMA-262, 3rd B.2.3\n    // Not an ECMAScript standard, although ECMAScript 3rd Edition has a\n    // non-normative section suggesting uniform semantics and it should be\n    // normalized across all browsers\n    // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE\n    var string_substr = StringPrototype.substr;\n    var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';\n    defineProperties(StringPrototype, {\n        substr: function substr(start, length) {\n            var normalizedStart = start;\n            if (start < 0) {\n                normalizedStart = max(this.length + start, 0);\n            }\n            return string_substr.call(this, normalizedStart, length);\n        }\n    }, hasNegativeSubstrBug);\n\n    // ES5 15.5.4.20\n    // whitespace from: http://es5.github.io/#x15.5.4.20\n    var ws = '\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003'\n        + '\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028'\n        + '\\u2029\\uFEFF';\n    var zeroWidth = '\\u200b';\n    var wsRegexChars = '[' + ws + ']';\n    var trimBeginRegexp = new RegExp('^' + wsRegexChars + wsRegexChars + '*');\n    var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + '*$');\n    var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());\n    defineProperties(StringPrototype, {\n        // http://blog.stevenlevithan.com/archives/faster-trim-javascript\n        // http://perfectionkills.com/whitespace-deviations/\n        trim: function trim() {\n            if (typeof this === 'undefined' || this === null) {\n                throw new TypeError(\"can't convert \" + this + ' to object');\n            }\n            return $String(this).replace(trimBeginRegexp, '').replace(trimEndRegexp, '');\n        }\n    }, hasTrimWhitespaceBug);\n    var trim = call.bind(String.prototype.trim);\n\n    var hasLastIndexBug = StringPrototype.lastIndexOf && 'abcあい'.lastIndexOf('あい', 2) !== -1;\n    defineProperties(StringPrototype, {\n        lastIndexOf: function lastIndexOf(searchString) {\n            if (typeof this === 'undefined' || this === null) {\n                throw new TypeError(\"can't convert \" + this + ' to object');\n            }\n            var S = $String(this);\n            var searchStr = $String(searchString);\n            var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;\n            var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);\n            var start = min(max(pos, 0), S.length);\n            var searchLen = searchStr.length;\n            var k = start + searchLen;\n            while (k > 0) {\n                k = max(0, k - searchLen);\n                var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);\n                if (index !== -1) {\n                    return k + index;\n                }\n            }\n            return -1;\n        }\n    }, hasLastIndexBug);\n\n    var originalLastIndexOf = StringPrototype.lastIndexOf;\n    defineProperties(StringPrototype, {\n        lastIndexOf: function lastIndexOf(searchString) {\n            return originalLastIndexOf.apply(this, arguments);\n        }\n    }, StringPrototype.lastIndexOf.length !== 1);\n\n    // ES-5 15.1.2.2\n    // eslint-disable-next-line radix\n    if (parseInt(ws + '08') !== 8 || parseInt(ws + '0x16') !== 22) {\n        /* global parseInt: true */\n        parseInt = (function (origParseInt) {\n            var hexRegex = /^[-+]?0[xX]/;\n            return function parseInt(str, radix) {\n                if (typeof str === 'symbol') {\n                    // handle Symbols in node 8.3/8.4\n                    // eslint-disable-next-line no-implicit-coercion, no-unused-expressions\n                    '' + str; // jscs:ignore disallowImplicitTypeConversion\n                }\n\n                var string = trim(String(str));\n                var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);\n                return origParseInt(string, defaultedRadix);\n            };\n        }(parseInt));\n    }\n\n    // https://es5.github.io/#x15.1.2.3\n    if (1 / parseFloat('-0') !== -Infinity) {\n        /* global parseFloat: true */\n        parseFloat = (function (origParseFloat) {\n            return function parseFloat(string) {\n                var inputString = trim(String(string));\n                var result = origParseFloat(inputString);\n                return result === 0 && strSlice(inputString, 0, 1) === '-' ? -0 : result;\n            };\n        }(parseFloat));\n    }\n\n    if (String(new RangeError('test')) !== 'RangeError: test') {\n        var errorToStringShim = function toString() {\n            if (typeof this === 'undefined' || this === null) {\n                throw new TypeError(\"can't convert \" + this + ' to object');\n            }\n            var name = this.name;\n            if (typeof name === 'undefined') {\n                name = 'Error';\n            } else if (typeof name !== 'string') {\n                name = $String(name);\n            }\n            var msg = this.message;\n            if (typeof msg === 'undefined') {\n                msg = '';\n            } else if (typeof msg !== 'string') {\n                msg = $String(msg);\n            }\n            if (!name) {\n                return msg;\n            }\n            if (!msg) {\n                return name;\n            }\n            return name + ': ' + msg;\n        };\n        // can't use defineProperties here because of toString enumeration issue in IE <= 8\n        Error.prototype.toString = errorToStringShim;\n    }\n\n    if (supportsDescriptors) {\n        var ensureNonEnumerable = function (obj, prop) {\n            if (isEnum(obj, prop)) {\n                var desc = Object.getOwnPropertyDescriptor(obj, prop);\n                if (desc.configurable) {\n                    desc.enumerable = false;\n                    Object.defineProperty(obj, prop, desc);\n                }\n            }\n        };\n        ensureNonEnumerable(Error.prototype, 'message');\n        if (Error.prototype.message !== '') {\n            Error.prototype.message = '';\n        }\n        ensureNonEnumerable(Error.prototype, 'name');\n    }\n\n    if (String(/a/mig) !== '/a/gim') {\n        var regexToString = function toString() {\n            var str = '/' + this.source + '/';\n            if (this.global) {\n                str += 'g';\n            }\n            if (this.ignoreCase) {\n                str += 'i';\n            }\n            if (this.multiline) {\n                str += 'm';\n            }\n            return str;\n        };\n        // can't use defineProperties here because of toString enumeration issue in IE <= 8\n        RegExp.prototype.toString = regexToString;\n    }\n}));\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./node_modules/es5-shim/es5-shim.js\n// module id = 238\n// module chunks = 4\n\n//# sourceURL=webpack:///./node_modules/es5-shim/es5-shim.js?");

/***/ })

/******/ });