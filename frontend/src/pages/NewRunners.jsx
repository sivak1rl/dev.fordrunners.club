import '../styles/style.css';
import '../styles/NewRunners.css';

function NewRunners() {
  return (
    <div id="content">
      <section id="welcome">
        <h1>Welcome, Future Ford Runner!</h1>
        <p>Note that any of these training plans <strong>can and should be adjusted to fit your individual
          needs</strong>, these are "one-size fits all" solutions that may not fit your needs. As always,
          consult with a physician or qualified health professional before engaging in any physical activity.
          Please review our <a href='/disclaimer'>disclaimer here</a>.</p>
        <p>Choose your adventure below:</p>
      </section>

      <section id="tips-tricks">
        <h2>Tips & Tricks</h2>
        <ul>
          <li><strong>Footwear:</strong> Good running shoes can help in biomechanical risk factors for overuse
            injuries<sup><a href="#ref4">[4]</a></sup>.</li>
          <li><strong>Hydration:</strong> Water is essential for endurance<sup><a href="#ref3">[3]</a></sup>.
          </li>
          <li><strong>Rest:</strong> Don't underestimate the power of a good night's sleep for
            recovery<sup><a href="#ref3">[3]</a></sup>.</li>
        </ul>
      </section>
      
      <section id="training-plans">
        <h2>Training Plans</h2>

        <h3>Couch to 5K: An 8-Week Plan</h3>
        <p>Inspired by the "Start to Run" program, which has been shown to effectively increase physical
          activity among novice runners<sup><a href="#ref1">[1]</a></sup>.</p>
        <p>Start to run is typically a program where practice will occur 3 times per week, with rest days
          between.</p>
        <p>"Periodized training programs should consider the target competitive distance, experience, and time availability."<br/>"Alternate sessions of high-intensity or sprint interval training with sessions of low and moderate intensity continuous training, with &geq; 75% of the volume at low intensity."<sup><a href="#ref3">[3]</a></sup></p>
        <ol>
          <li><strong>Week 1:</strong> Walk 5 min, Run 1 min (Repeat 4 times)</li>
          <li><strong>Week 2:</strong> Walk 4 min, Run 2 min (Repeat 4 times)</li>
          <li><strong>Week 3:</strong> Walk 3 min, Run 3 min (Repeat 4 times)</li>
          <li><strong>Week 4:</strong> Walk 2 min, Run 4 min (Repeat 4 times)</li>
          <li><strong>Week 5:</strong> Walk 2 min, Run 5 min (Repeat 3 times)</li>
          <li><strong>Week 6:</strong> Walk 1 min, Run 6 min (Repeat 3 times)</li>
          <li><strong>Week 7:</strong> Walk 1 min, Run 7 min (Repeat 3 times)</li>
          <li><strong>Week 8:</strong> Walk 1 min, Run 8 min (Repeat 3 times)</li>
        </ol>
        
        <h3>Couch to 10K: A 12-Week Plan</h3>
        <ol>
          <li><strong>Week 1:</strong> Walk 4 min, Run 2 min (Repeat 4 times)</li>
          <li><strong>Week 2:</strong> Walk 3 min, Run 3 min (Repeat 4 times)</li>
          <li><strong>Week 3:</strong> Walk 2 min, Run 4 min (Repeat 4 times)</li>
          <li><strong>Week 4:</strong> Walk 2 min, Run 5 min (Repeat 3 times)</li>
          <li><strong>Week 5:</strong> Walk 1 min, Run 6 min (Repeat 3 times)</li>
          <li><strong>Week 6:</strong> Walk 1 min, Run 7 min (Repeat 3 times)</li>
          <li><strong>Week 7:</strong> Walk 1 min, Run 8 min (Repeat 3 times)</li>
          <li><strong>Week 8:</strong> Walk 1 min, Run 9 min (Repeat 3 times)</li>
          <li><strong>Week 9:</strong> Walk 1 min, Run 10 min (Repeat 3 times)</li>
          <li><strong>Week 10:</strong> Walk 1 min, Run 11 min (Repeat 3 times)</li>
          <li><strong>Week 11:</strong> Walk 1 min, Run 12 min (Repeat 3 times)</li>
          <li><strong>Week 12:</strong> Walk 1 min, Run 13 min (Repeat 3 times)</li>
        </ol>
        
        <h3>Marathon Training: An 18-Week Plan for Serious Runners</h3>
        <p>Coming soon... &#127754;</p>
      </section>

      <section id="references">
        <h4>References:</h4>
        <ol>
          <li><a target="_blank" id="ref1"
            href="https://bmcpublichealth.biomedcentral.com/counter/pdf/10.1186/1471-2458-13-697">Effectiveness
            of Start to Run, a 6-week training program for novice runners</a></li>
          <li><a target="_blank" id="ref3"
            href="https://www.mdpi.com/2075-4663/8/3/35/pdf?version=1585288260">Factors
            Affecting Training and Physical Performance in Recreational Endurance Runners</a></li>
          <li><a target="_blank" id="ref4"
            href="https://link.springer.com/content/pdf/10.1007/s40279-022-01666-3.pdf">Running-Related
            Biomechanical Risk Factors for Overuse Injuries in Distance Runners</a></li>
        </ol>
      </section>
    </div>
  );
}

export default NewRunners;