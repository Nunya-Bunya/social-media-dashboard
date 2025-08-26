"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackendTest;
const react_1 = require("react");
function BackendTest() {
    const [status, setStatus] = (0, react_1.useState)('Testing...');
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const testBackendConnection = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/docs');
                if (response.ok) {
                    setStatus('✅ Backend Connected Successfully!');
                    setError(null);
                }
                else {
                    setStatus('⚠️ Backend Responding but with Issues');
                    setError(`Status: ${response.status} - ${response.statusText}`);
                }
            }
            catch (err) {
                setStatus('❌ Backend Connection Failed');
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
        };
        testBackendConnection();
    }, []);
    return (<div className="p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-xl font-semibold mb-4">Backend Connection Test</h2>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{status}</span>
        </div>
        
        {error && (<div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">
              <strong>Error:</strong> {error}
            </p>
          </div>)}
        
        <div className="text-sm text-gray-600">
          <p><strong>Backend URL:</strong> http://localhost:3001/api</p>
          <p><strong>API Documentation:</strong> http://localhost:3001/api/docs</p>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">
            <strong>Next Steps:</strong> If the connection is successful, you can now start building features that connect to your comprehensive marketing platform backend!
          </p>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=BackendTest.js.map