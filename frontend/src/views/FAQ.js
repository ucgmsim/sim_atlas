import React from "react";

const FAQ = () => {

  return (
    <div className="WordSection1">
      <p className="MsoNormal">
        <b>
          <span>Seistech Simulation Atlas</span>
        </b>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What exactly is being shown on this webpage?</span>
      </p>

      <p className="MsoNormal">
        <span>
          This Simulation Atlas product provides a interactive viewing of all
          the mapped active faults in New Zealand, their properties, and an
          illustrative ground motion simulation for a potential major earthquake
          on each fault.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What is the reference for all of the earthquake faults?</span>
      </p>

      <p className="MsoNormal">
        <span>
          The set of faults that are displayed are based on Stirling et al.
          (2012), which is the current national concensus model used to describe
          seismic hazard across New Zealand.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What do the polygons represent?</span>
      </p>

      <p className="MsoNormal">
        <span>
          They represent the surface projection of the fault. The upper edge of
          the fault (that which is closest to the surface) is shown with a
          thicker line. Most (but not all faults) have upper edges which are
          near to the surface, and extend down to depths of 10+ kilometres.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What does Tectonic Type represent?</span>
      </p>

      <p className="MsoNormal">
        <span>
          Earthquakes occur in the earths crust due to ruptures on faults
          Scientifically we typically talk about different Tectonic types within
          which earthquake ruptures occur. Here we differentiate between faults
          that occur in Active Shallow Crustal (Crustal), Volcanic, and
          Subduction interface (Subduction) environments. Active Shallow Crustal
          earthauakes occur within the shallow crust in areas of active
          seismicity. Volcanic earthquakes also typically occur in the shallow
          crustal regions, but in regions of active volcanism (which means the
          properties of these earthquakes are notably different). Subduction
          zone earthquakes occur in regions where one tectonic plate is subduced
          beneath the other subduction interface earthquakes at the interface
          between the two plates, and subduction slab earthquakes in the
          subducted slab itself.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What does Magnitude represent?</span>
      </p>

      <p className="MsoNormal">
        <span>
          Magnitude (specifically Moment magnitude) is a measure of the size of
          the earthquake. See
          <a href="https://en.wikipedia.org/wiki/Moment_magnitude_scale">
            https://en.wikipedia.org/wiki/Moment_magnitude_scale
          </a>
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q; What does Probability represent?</span>
      </p>

      <p className="MsoNormal">
        <span>
          We cannot predict precisely when earthquakes will occur on faults.
          However, using information associated with the present and historical
          movement of the earth we can forecast the probability of a specific
          earthquake rupture. The probabilities provided are that in a 50 year
          period, which is the typical time frame used in the design of
          structures. A probability of 50% is equivalent to guessing heads in a
          coin toss, and 17% for a given number of a six-side die, for example.
        </span>
      </p>

      <p className="MsoNormal">
        <span>
          See:
          <a href="https://en.wikipedia.org/wiki/Earthquake_forecasting">
            https://en.wikipedia.org/wiki/Earthquake_forecasting
          </a>
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What is the difference between fault and rupture?</span>
      </p>

      <p className="MsoNormal">
        <span>
          Fault describes the geometry of the weakness in the crust on which an
          earthquake rupture can occur. The rupture is the earthquake itself,
          whereas the fault exists prior to any specific earthquake occurring.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>Q: What does the image of the fault rupture represent?</span>
      </p>

      <p className="MsoNormal">
        <span>
          When you select a specific fault, an image of a potential rupture on
          that fault will appear. This rupture image highlights the location
          where the rupture begins (the hypocentre denoted with a star); the
          slip amplitude that occurs due to rupture over the fault (with warmer
          colours indicating higher slip).
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>
          Q: How do you know the specific rupture that will occur on each fault?
        </span>
      </p>

      <p className="MsoNormal">
        <span>
          We dont! This is only one potential rupture that could occur on the
          fault, there is uncertainty in the exact rupture that will occur
          during the next earthquake in rigorous we consider many possibilities
          for potential future ruptures. Only one example for each fault is
          provided in this interfactive product, because it is focused on
          general science communication, and not rigorous quantiative analysis.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <span>
          Q: What specifically is displayed in the ground motion simulation
          animation?
        </span>
      </p>

      <p className="MsoNormal">
        <span>
          For each rupture, a ground motion simulation animation is provided via
          YouTube. The animation begins with showing the image of the fault
          rupture from a rotating perspective (see:
          <span>Q: What does the image of the fault rupture represent?</span>
          ). As the animation begins it illustrates both the occurrence of
          rupture slip on the fault (right colorbar) and also the consequent
          ground motion at the earths surface in terms of the peak ground
          velocity (left colorbar). These animations are based on ground motion
          simulation models which solve the physics-based equations that
          describe earthquake rupture and ground motion wave propagation much in
          the same way that similar models are used in weather prediction. The
          animations are created using the GmSimViz open-source software (Polak
          et al. 2019).
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>
      <p className="MsoNormal">
        <span>Q: Who has supported the development of Simulation Atlas?</span>
      </p>

      <p className="MsoNormal">
        <span>
          This open-source product has been developed by SeisTech in partnership
          with QuakeCoRE: The New Zealand Centre for Earthquake Resilience.
          QuakeCoRE researchers performed the underlying ground motion
          simulations, which were calculated using high-performance computing
          resources provided by the National e-Science Infrastructure (NeSI).
          Historical earthquake data depicted is provided by GeoNet.
        </span>
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>

      <p className="MsoNormal">
        <b>
          <span>References:</span>
        </b>
      </p>

      <p className="MsoNormal">
        <b>
          <span>&nbsp;</span>
        </b>
      </p>

      <p className="MsoNormal">
        Stirling, M. <i>et al.</i> National seismic hazard model for New
        Zealand: 2010 update.
        <i>Bulletin of the Seismological Society of America</i> <b>102</b>,
        15141542 (2012).
      </p>

      <p className="MsoNormal">
        Polak, V. &amp; Zhu M, Bae S, Motha J, Bradley BA, Razafindrakoto HNT.
        GmSimViz: Automated 3D visualization of ground motion simulation with
        generic mapping tools (GMT). <i>The Journal of Open Source Software</i>
        <b>4</b>, 808 (2019).
      </p>

      <p className="MsoNormal">
        <span>&nbsp;</span>
      </p>
    </div>
  );
};

export default FAQ;
