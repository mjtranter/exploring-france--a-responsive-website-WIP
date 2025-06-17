import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../../../assets/colours/colours.css';
import './history.css';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { PiFilmSlate } from 'react-icons/pi';
import { GoPerson }  from 'react-icons/go';
import UKIcon from '../../../assets/images/uk-icon.png';
import QuebecIcon from '../../../assets/images/quebec-icon.png';
import JapanIcon from '../../../assets/images/japan-icon.png';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CountryCodeContext } from '../../../App';

export default function History() {
    const ns = "film";
    const { t } = useTranslation(ns);

    useEffect(() => {
        document.title = t('history-title');
    });

    let countryCode = useContext(CountryCodeContext);
    const countryParam = new URLSearchParams(window.location.search).get("countrySim");
    if (countryParam) countryCode = countryParam.toLowerCase();

    let timelineItems = t('timeline', { returnObjects: true });

    return (
        <div>
            <VerticalTimeline layout="1-column-left" lineColor="var(--dark-theme)">
                {timelineItems.filter(timelineItem => {
                    if (timelineItem.type === "film") return true;
                    if (timelineItem.type === "person") return true;
                    if (timelineItem.type.substring(0,10) === "connection" && timelineItem.type.substring(11,13) === countryCode) return true;
                    if (timelineItem.type === "information") return true;
                    return false;
                })      
                .map(timelineItem => {
                    let primaryColour;
                    let iconName;
                    let itemClass;
                    if (timelineItem.type === "film") {
                        primaryColour = "var(--teal-theme)";
                        iconName = <PiFilmSlate />;
                        itemClass = "film-item";
                    }
                    
                    else if (timelineItem.type === "person") {
                        primaryColour = "var(--purple-theme)";
                        iconName = <GoPerson />;
                        itemClass = "person-item";
                    }

                    else if (timelineItem.type === "connection " + countryCode) {
                        primaryColour = "var(--french-red)";
                        itemClass = "connection-item";

                        switch (countryCode) {
                            case "jp":
                                iconName = <img src={JapanIcon} alt="Japan Connection" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                                break;
                            case "ca":
                                iconName = <img src={QuebecIcon} alt="Quebec Connection" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                                break;
                            default:
                                iconName = <img src={UKIcon} alt="UK Connection" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
                                break;
                        }
                    }

                    else {
                        primaryColour = "var(--orange-theme)";
                        iconName = <HiOutlineBookOpen />
                        itemClass = "information-item"; 
                    }

                    return (
                        <VerticalTimelineElement key={timelineItem.title} className={"vertical-timeline-element " + itemClass} iconStyle={{ background: primaryColour, color: "var(--french-white)" }} icon={iconName}>
                            <div className="text-row">
                                <h5 className="vertical-timeline-element-title"><b>{timelineItem.title}</b></h5>
                                <p className="vertical-timeline-date"><i>{timelineItem.date}</i></p>
                            </div>
                            <div className="timeline-content" dangerouslySetInnerHTML={{__html: timelineItem.content}} />
                        </VerticalTimelineElement>
                    )
                })}
            </VerticalTimeline>
        </div>
    )
}