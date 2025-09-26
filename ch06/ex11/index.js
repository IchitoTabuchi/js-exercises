export const PolarPoint = (r, theta) => {
    let _r = r;
    let _theta = theta;
    return Object.create({}, {
        r: {
            get() {
                return _r;
            },
            set(v) {
                _r = v;
            },
            enumerable: true,
        },
        theta: {
            get() {
                return _theta;
            },
            set(v) {
                _theta = v;
            },
            enumerable: true,
        },
        x: {
            get() {
                return _r * Math.cos(_theta);
            },
            set(v) {
                if (Number.isNaN(v))
                    throw new Error('Invalid value for x: NaN');
                const y = _r * Math.sin(_theta);
                _r = Math.hypot(v, y);
                _theta = Math.atan2(y, v);
            },
            enumerable: true,
        },
        y: {
            get() {
                return _r * Math.sin(_theta);
            },
            set(v) {
                if (Number.isNaN(v))
                    throw new Error('Invalid value for y: NaN');
                const x = _r * Math.cos(_theta);
                _r = Math.hypot(x, v);
                _theta = Math.atan2(v, x);
            },
            enumerable: true,
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFTLEVBQUUsS0FBYSxFQUFFLEVBQUU7SUFDckQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FDbEIsRUFBRSxFQUNGO1FBQ0UsQ0FBQyxFQUFFO1lBQ0QsR0FBRztnQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUM7WUFDRCxHQUFHLENBQUMsQ0FBUztnQkFDWCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1QsQ0FBQztZQUNELFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsR0FBRztnQkFDRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDO1lBQ0QsR0FBRyxDQUFDLENBQVM7Z0JBQ1gsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNiLENBQUM7WUFDRCxVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELENBQUMsRUFBRTtZQUNELEdBQUc7Z0JBQ0QsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsR0FBRyxDQUFDLENBQVM7Z0JBQ1gsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQ0QsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxDQUFDLEVBQUU7WUFDRCxHQUFHO2dCQUNELE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUNELEdBQUcsQ0FBQyxDQUFTO2dCQUNYLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUNELFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ0YsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=