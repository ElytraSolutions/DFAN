import { Tooltip } from '@mui/material';
import World from '@svg-maps/world';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { ClassNames } from '@emotion/react';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import './WorldMap.css';

export default function WorldMap() {
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState<Record<string, number>>({});
    useEffect(() => {
        (async () => {
            const resp = await fetch('/api/admins/usersByCountry');
            const data: Array<{ country: string; count: number }> =
                await resp.json();
            const newData = data.reduce(
                (acc, { country, count }) => {
                    acc[country] = count;
                    return acc;
                },
                {} as Record<string, number>,
            );
            setCountries(newData);
        })();
    }, []);
    const opacities: Record<string, number> = {};
    let max = 0;
    Object.entries(countries).forEach(([country, count]) => {
        if (country) {
            max = Math.max(max, count);
        }
    });
    Object.entries(countries).forEach(([country, count]) => {
        if (country) {
            opacities[country] = Math.max(0.3, count / max);
        }
    });
    const MapWithRef = forwardRef(
        (props, ref: ForwardedRef<HTMLDivElement>) => {
            return (
                <div
                    {...props}
                    ref={ref}
                    id="world-map"
                    className="w-auto h-full overflow-x-scroll"
                >
                    <SVGMap
                        map={World}
                        className="h-full w-full"
                        onLocationMouseOver={(e) => {
                            setCountry(e.target.attributes.name.value);
                        }}
                        onLocationBlur={() => {
                            setCountry('');
                        }}
                        onLocationMouseOut={() => {
                            setCountry('');
                        }}
                        locationClassName={(location) => {
                            const name = location.name;
                            document
                                .querySelector(`#${location.id}`)
                                ?.setAttribute(
                                    'fill',
                                    `${
                                        opacities[name]
                                            ? `rgba(0,255,0,${opacities[name]})`
                                            : 'rgb(200,200,200)'
                                    }`,
                                );
                            return ``;
                        }}
                    />
                </div>
            );
        },
    );
    const tooltipContents = country ? (
        <div className="flex flex-col text-lg">
            <p>
                {country}: {countries[country] ?? 0}
            </p>
        </div>
    ) : null;
    return (
        <>
            <Tooltip title={tooltipContents} placement="top" followCursor>
                <MapWithRef />
            </Tooltip>
        </>
    );
}
