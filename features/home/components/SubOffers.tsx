"use client";
import {
  BadgeCheck,
  Bolt,
  Book,
  BookOpen,
  Brain,
  CalendarCheck2,
  ChartColumnIncreasingIcon,
  ClipboardList,
  Clock3,
  FileCheck2,
  Newspaper,
  School,
  Stethoscope,
  StethoscopeIcon,
  Target,
  TrendingUp,
  Unlock,
} from "lucide-react";
import styles from "../styles.module.css";

function SubOffers() {
  return (
    <div className={styles.sub_offers}>
      <section>
        <p>
          Our site provides verified, legitimate and accurate data to help and
          guide you on your path towards a successful nursing career.
        </p>
      </section>

      <div>
        <div>
          <div className={styles.card1}>
            <h2>
              study real
              <br />
              past questions
            </h2>
            <ul>
              <li>
                <span>
                  <ClipboardList />
                </span>
                <h4>
                  exam
                  <br />
                  focused
                </h4>
              </li>
              <li>
                <span>
                  <Brain />
                </span>
                <h4>
                  better
                  <br />
                  preparation
                </h4>
              </li>
              <li>
                <span>
                  <ChartColumnIncreasingIcon />
                </span>
                <h4>
                  higher
                  <br />
                  success
                </h4>
              </li>
            </ul>
          </div>
          <p>
            We provide nursing students access to real examination past
            questions to help them understand exam patterns, identify important
            topics and practice under exam focused conditions for better exam
            confidence and practices from past examinations.
          </p>
        </div>

        <div>
          <div className={styles.card2}>
            <h2>
              get regularly
              <br />
              updated contents
            </h2>
            <ul>
              <li>
                <span>
                  <CalendarCheck2 />
                </span>
                <h4>
                  frequent
                  <br />
                  updates
                </h4>
              </li>
              <li>
                <span>
                  <FileCheck2 />
                </span>
                <h4>
                  accurate
                  <br />
                  and reliable
                </h4>
              </li>
              <li>
                <span>
                  <Clock3 />
                </span>
                <h4>
                  stay
                  <br />
                  ahead
                </h4>
              </li>
            </ul>
          </div>

          <p>
            We provide nursing students with regularly updated educational
            nursing contents including course tutorials, notes, clinical
            guidelines, study materials, quiz etc, for improving knowledge,
            studying and better examination preparations.
          </p>
        </div>

        <div>
          <div className={styles.card3}>
            <h2>
              Nursing
              <br />
              News & Updates
            </h2>
            <ul>
              <li>
                <span>
                  <School />
                </span>
                <h4>
                  school
                  <br />
                  updates
                </h4>
              </li>
              <li>
                <span>
                  <Newspaper />
                </span>
                <h4>
                  nursing &<br />
                  healthcare news
                </h4>
              </li>
              <li>
                <span>
                  <Stethoscope />
                </span>
                <h4>
                  nursing
                  <br />
                  practices
                </h4>
              </li>
            </ul>
          </div>
          <p>
            We are dedicated to bringing you important nursing and healthcare
            news, school updates, examination information, registration
            deadlines etc, to keep students informed and ensure they don't miss
            important opportunities or developments in nursing.
          </p>
        </div>

        <div>
          <div className={styles.card4}>
            <h2>
              Nursing
              <br />
              Recommendations
            </h2>
            <ul>
              <li>
                <span>
                  <TrendingUp />
                </span>
                <h4>
                  career
                  <br />
                  development
                </h4>
              </li>
              <li>
                <span>
                  <Book />
                </span>
                <h4>
                  useful
                  <br />
                  resource
                </h4>
              </li>
              <li>
                <span>
                  <StethoscopeIcon />
                </span>
                <h4>
                  clinical
                  <br />
                  guidance
                </h4>
              </li>
            </ul>
          </div>
          <p>
            We provide nursing students with useful recommendations on study
            methods, clinical practice, nursing resources, career development
            and essential tools to guide you on the right path or choices to
            make as you progress higher in nursing related fields.
          </p>
        </div>
      </div>

      <h3>
        <Unlock color="tomato" size={50} />
        100% free access
      </h3>
    </div>
  );
}

export { SubOffers };
