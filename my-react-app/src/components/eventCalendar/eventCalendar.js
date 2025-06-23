import { useTranslation } from 'react-i18next';
import { DayPilot, DayPilotMonth } from '@daypilot/daypilot-lite-react';
import './eventCalendar.css';
import { useState, useEffect, useContext } from 'react';
import { CountryCodeContext } from '../../App';

export default function EventCalendar({ns, type}) {
    const { t, i18n } = useTranslation(ns);

    const countryCode = useContext(CountryCodeContext);

    //calendar source: https://code.daypilot.org/26289/react-monthly-calendar-tutorial
    const startDate = DayPilot.Date.today();
    const listEvents = t('list-events', { ns: "events", returnObjects: true });
    const events = listEvents.filter(event => {
        if ((ns === "events" || event.type.includes(ns)) && (event.country.includes("France") || (event.connection === countryCode && event.country !== "France"))) return true;
        return false;
    });

    const locale = (() => {
        switch (i18n.resolvedLanguage) {
            case 'ja':
                return 'ja-jp';
            case 'fr':
                return 'fr-fr';
            default:
                return 'en-gb';
        }
    })();

    const config = {
        onBeforeEventRender: args => {
            args.data.borderColor = "darker";
            if (args.data.backColor) {
                args.data.barColor = DayPilot.ColorUtil.lighter(args.data.backColor, 1);
            }
        },
        eventHeight: 24
    }

    
    let firstDay = startDate.firstDayOfMonth().dayOfWeek();
    if (firstDay == 0) firstDay = 7;
    
    //adapt calendar view to accommodate for Japanese weeks starting on Sundays
    if (i18n.resolvedLanguage === "ja") {
        firstDay += 1;
        if (firstDay === 8) firstDay = 0;
    }

    //calculate transformation to show current week in short view
    const rowsAbove = Math.floor(startDate.getDay() / 7);
    const totalRowsAbove = (firstDay + (startDate.getDay() % 7)) > 8 ? rowsAbove + 1 : rowsAbove;
    const heightTranslation = 30 + (100 * totalRowsAbove);
    
    const calendarContainer = "calendar-container" + (type === "full" ? " full" : "");

    const [narrowView, setNarrowView] = useState(false);
    //check for narrow view to use short names eg. Mon, Tue
    useEffect(() => {
        const checkWidth = () => {
            setNarrowView(window.innerWidth < 1272);
        }

        checkWidth();

        window.addEventListener('resize', checkWidth);

        return () => window.removeEventListener('resize', checkWidth);
    })

    const getDay = (value) => {
        const dayValue = (narrowView || type === "full") ? ("short-" + value) : value;
        return t(dayValue, { ns: 'common' });
    }

    return (
        <div className={calendarContainer}>
            <div className="calendar-header">
                <div className="calendar-day right">{getDay('day-one')}</div>
                <div className="calendar-day right">{getDay('day-two')}</div>
                <div className="calendar-day right">{getDay('day-three')}</div>
                <div className="calendar-day right">{getDay('day-four')}</div>
                <div className="calendar-day right">{getDay('day-five')}</div>
                <div className="calendar-day right">{getDay('day-six')}</div>
                <div className="calendar-day">{getDay('day-seven')}</div>
            </div>
            
            
            {type === "full" && (
                <div className="full">
                    <DayPilotMonth {...config} startDate={startDate} events={events} locale={locale} timeRangeSelectedHandling="Disabled" eventMoveHandling="Disabled" eventResizeHandling="Disabled" />
                </div>
            )}

            {type === "short" && (
                <div className="short">
                    <DayPilotMonth {...config} startDate={startDate} events={events} locale={locale} timeRangeSelectedHandling="Disabled" eventMoveHandling="Disabled" eventResizeHandling="Disabled" />
                    <style>{`
                        .short .month_default_main {
                            transform: translateY(-${heightTranslation}px);
                        }
                    `}</style>
                </div>
            )}
        </div>
    )
}