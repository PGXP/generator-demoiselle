package <%= package.lower %>.<%= project.lower %>.envers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Logger;
import static java.util.logging.Logger.getLogger;
import static javax.persistence.CascadeType.MERGE;
import static javax.persistence.CascadeType.PERSIST;
import static javax.persistence.CascadeType.REMOVE;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import static javax.persistence.TemporalType.TIMESTAMP;
import org.hibernate.annotations.NotFound;
import static org.hibernate.annotations.NotFoundAction.IGNORE;
import org.hibernate.envers.ModifiedEntityNames;
import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

/**
 *
 * @author 70744416353
 */
@Entity
@RevisionEntity(AuditRevisionListener.class)
public class AuditRevEntity implements Serializable {

    private static final Logger LOG = getLogger(AuditRevEntity.class.getName());

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @RevisionNumber
    private Long id;

    @RevisionTimestamp
    @Temporal(TIMESTAMP)
    private Date dataCriacao;

    private String username;

    @Column(name = "_where")
    private String where;

    private String fingerprint;

    private String fullName;

    private String perfil;

    @ElementCollection
    @JoinTable(name = "REVCHANGES", joinColumns = @JoinColumn(name = "REV"))
    @Column(name = "ENTITYNAME")
    @ModifiedEntityNames
    @NotFound(action = IGNORE)
    private Set<String> modifiedEntityNames;

    @OneToMany(mappedBy = "revision", cascade = {PERSIST, REMOVE, MERGE})
    @NotFound(action = IGNORE)
    private final Set<ModifiedEntityTypeEntity> modifiedEntityTypes
            = new HashSet<ModifiedEntityTypeEntity>();

    /**
     *
     * @param entityClassName
     */
    public void addModifiedEntityType(String entityClassName) {
        modifiedEntityTypes.add(new ModifiedEntityTypeEntity(this, entityClassName));
    }

    /**
     *
     * @return
     */
    public Set<String> getModifiedEntityNames() {
        return Collections.unmodifiableSet(modifiedEntityNames);
    }

    /**
     *
     * @param modifiedEntityNames
     */
    public void setModifiedEntityNames(Set<String> modifiedEntityNames) {
        this.modifiedEntityNames = modifiedEntityNames;
    }

    /**
     *
     * @return
     */
    @JsonIgnore
    public Set<ModifiedEntityTypeEntity> getModifiedEntityTypes() {
        return Collections.unmodifiableSet(modifiedEntityTypes);
    }

    /**
     *
     * @return
     */
    public String getUsername() {
        return username;
    }

    /**
     *
     * @param username
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     *
     * @return
     */
    public String getWhere() {
        return where;
    }

    /**
     *
     * @param where
     */
    public void setWhere(String where) {
        this.where = where;
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
    public Date getDataCriacao() {
        return dataCriacao != null ? new Date(dataCriacao.getTime()) : null;
    }

    /**
     *
     * @param dataCriacao
     */
    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao != null ? new Date(dataCriacao.getTime()) : null;
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
     * @return
     */
    public String getFullName() {
        return fullName;
    }

    /**
     *
     * @param fullName
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    /**
     *
     * @return
     */
    public String getFingerprint() {
        return fingerprint;
    }

    /**
     *
     * @param fingerprint
     */
    public void setFingerprint(String fingerprint) {
        this.fingerprint = fingerprint;
    }

    /**
     *
     * @return
     */
    public String getPerfil() {
        return perfil;
    }

    /**
     *
     * @param perfil
     */
    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

}
