export declare class TestController {
    getTest(): {
        message: string;
        timestamp: string;
        status: string;
        version: string;
    };
    postEcho(data: any): {
        message: string;
        received: any;
        timestamp: string;
    };
}
