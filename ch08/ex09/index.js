export const withResource = (resource, fn) => {
    try {
        fn(resource); // 実行するだけなのでreturn不要
    }
    finally {
        resource.close();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FDMUIsUUFBVyxFQUNYLEVBQW9CLEVBQ2QsRUFBRTtJQUNSLElBQUksQ0FBQztRQUNILEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtJQUNwQyxDQUFDO1lBQVMsQ0FBQztRQUNULFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=