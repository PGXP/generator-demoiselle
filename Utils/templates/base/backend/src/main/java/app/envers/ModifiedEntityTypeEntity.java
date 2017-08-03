package <%= package.lower %>.<%= project.lower %>.envers;

import java.io.Serializable;
import java.util.logging.Logger;
import static java.util.logging.Logger.getLogger;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.NotFound;
import static org.hibernate.annotations.NotFoundAction.IGNORE;

/**
 *
 * @author 70744416353
 */
@Entity
public class ModifiedEntityTypeEntity implements Serializable {

    private static final Logger LOG = getLogger(ModifiedEntityTypeEntity.class.getName());

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne
    @NotFound(action = IGNORE)
    private AuditRevEntity revision;

    private String entityClassName;

    /**
     *
     */
    public ModifiedEntityTypeEntity() {
    }

    /**
     *
     * @param revision
     * @param entityClassName
     */
    public ModifiedEntityTypeEntity(AuditRevEntity revision, String entityClassName) {
        this.revision = revision;
        this.entityClassName = entityClassName;
    }

    /**
     *
     * @return
     */
    public Long getId() {
        return id;
    }

    /**
     *
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     *
     * @return
     */
    public AuditRevEntity getRevision() {
        return revision;
    }

    /**
     *
     * @param revision
     */
    public void setRevision(AuditRevEntity revision) {
        this.revision = revision;
    }

    /**
     *
     * @return
     */
    public String getEntityClassName() {
        return entityClassName;
    }

    /**
     *
     * @param entityClassName
     */
    public void setEntityClassName(String entityClassName) {
        this.entityClassName = entityClassName;
    }

}
